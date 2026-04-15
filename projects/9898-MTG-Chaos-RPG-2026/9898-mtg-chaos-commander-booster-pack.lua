--------------------------------------------------------------------------------------
--Deck Spawner (Chaos Commander Booster Pack)
--Based on Budster024 Jan 2026 Scryfall Patcher 1.0
--
-- Spawns a 15-card "Chaos Commander Booster Pack" into ONE STACK PILE using
-- DIRECT Scryfall API with safeguards:
-- ✔ normal / small images ONLY (NO large/png)
-- ✔ throttle + 429 backoff + retries
-- ✔ cooldown
-- ✔ spawn lock + safety timeout
-- ✔ CMC + Type Line added to Nickname (NO other behavior changed)
--------------------------------------------------------------------------------------

local SCRY_BASE = "https://api.scryfall.com"
local BACK_URL  = "https://i.imgur.com/yHEAQ88.jpeg"

-- Rate limiting
local MIN_DELAY = 0.35
local MAX_RETRY = 3

-- Safety cap
local MAX_PACK_SIZE = 30

-- Cooldown + lock/timeout safeguards
local COOLDOWN_SECONDS       = 15
local SPAWN_TIMEOUT_SECONDS  = 90
local _cooldownUntil         = 0
local _isSpawning            = false
local _spawnEndsAt           = 0

-- Button / spawn layout
local BTN_Y       = 0.35
local STACK_POS   = { x = 0, z = -5 }
local BASE_LIFT   = 7.0
local CARD_LIFT   = 0.20

-- Internal state
local _stackIndex     = 0
local _deckIdCounter  = 1
local _nextTime       = 0

---------------------------------------------------------------------------
-- Headers (API compliant)
---------------------------------------------------------------------------
local function scryHeaders()
  return {
    ["User-Agent"] = "TTS-ChaosCommanderSpawner/1.0 (Tabletop Simulator)",
    ["Accept"]     = "application/json;q=0.9,*/*;q=0.8",
  }
end

---------------------------------------------------------------------------
-- Utilities
---------------------------------------------------------------------------
local function schedule(fn, delay)
  Wait.time(fn, math.max(0, delay or 0))
end

local function urlEncode(str)
  if not str then return "" end
  str = tostring(str)
  str = str:gsub("\n", "\r\n")
  str = str:gsub("([^%w %-%_%.%~])", function(c)
    return string.format("%%%02X", string.byte(c))
  end)
  return str:gsub(" ", "%%20")
end

local function forceUnlockIfTimedOut()
  local now = os.time()
  if _isSpawning and now >= _spawnEndsAt then
    _isSpawning = false
    print("Spawner safety timeout reached. Unlocking.")
  end
end

---------------------------------------------------------------------------
-- Request queue w/ throttle + backoff
---------------------------------------------------------------------------
local function queueRequest(url, cb, attempt)
  attempt = attempt or 1

  local now = os.clock()
  _nextTime = math.max(_nextTime, now) + MIN_DELAY
  local delay = math.max(0, _nextTime - now)

  schedule(function()
    WebRequest.custom(url, "GET", true, nil, scryHeaders(), function(req)
      if req.is_error then
        if attempt < MAX_RETRY then
          schedule(function()
            queueRequest(url, cb, attempt + 1)
          end, 0.6)
        else
          cb(false, req.error or "WebRequest error")
        end
        return
      end

      local code = tonumber(req.response_code) or 0

      if code == 429 and attempt < MAX_RETRY then
        local backoff = 1.5 * attempt
        _nextTime = os.clock() + backoff
        schedule(function()
          queueRequest(url, cb, attempt + 1)
        end, backoff)
        return
      end

      if code >= 500 and code <= 599 and attempt < MAX_RETRY then
        local backoff = 0.75 * attempt
        schedule(function()
          queueRequest(url, cb, attempt + 1)
        end, backoff)
        return
      end

      if code ~= 200 then
        cb(false, "HTTP " .. code)
        return
      end

      cb(true, req.text)
    end)
  end, delay)
end

---------------------------------------------------------------------------
-- Image selection (NORMAL / SMALL ONLY)
---------------------------------------------------------------------------
local function pickFaceUrl(data)
  if data.image_uris then
    return data.image_uris.normal or data.image_uris.small
  end

  if data.card_faces and data.card_faces[1] and data.card_faces[1].image_uris then
    local iu = data.card_faces[1].image_uris
    return iu.normal or iu.small
  end

  return nil
end

---------------------------------------------------------------------------
-- Card text helpers
---------------------------------------------------------------------------
local function dashFix(s)
  if not s or s == "" then return "" end
  s = tostring(s)
  s = s:gsub("—", "--")
  s = s:gsub("–", "--")
  s = s:gsub("%?", "--")
  return s
end

local function buildNickname(data)
  local function safe(v) return (v == nil) and "" or tostring(v) end

  local cmc = safe(data.cmc)
  local typeLine = dashFix(safe(data.type_line))
  local name = safe(data.name)

  if data.card_faces and data.card_faces[1] then
    local f = data.card_faces[1]
    local fName = safe(f.name) ~= "" and safe(f.name) or name
    local fTypeRaw = safe(f.type_line)
    local fType = dashFix(fTypeRaw) ~= "" and dashFix(fTypeRaw) or typeLine

    if cmc ~= "" then
      return fName .. "\n" .. fType .. " " .. cmc .. "CMC"
    else
      return fName .. "\n" .. fType
    end
  end

  if cmc ~= "" then
    return name .. "\n" .. typeLine .. " " .. cmc .. "CMC"
  end
  return name .. "\n" .. typeLine
end

local function buildDescription(data)
  if data.card_faces and not data.oracle_text then
    local out = {}
    for _, f in ipairs(data.card_faces) do
      table.insert(out, (f.name or "") .. "\n" .. (f.oracle_text or ""))
    end
    return table.concat(out, "\n\n---\n\n")
  end
  return data.oracle_text or ""
end

---------------------------------------------------------------------------
-- Spawn helpers
---------------------------------------------------------------------------
local function getNextStackWorldPos()
  local base = self.getPosition()
  _stackIndex = _stackIndex + 1
  return {
    x = base.x + STACK_POS.x,
    y = base.y + BASE_LIFT + (_stackIndex * CARD_LIFT),
    z = base.z + STACK_POS.z
  }
end

local function spawnCardFromJson(jsonText)
  local data = JSON.decode(jsonText)
  if not data then return end
  if data.object == "error" then return end
  if data.object ~= "card" then return end

  local face = pickFaceUrl(data)
  if not face then return end

  local deckId = _deckIdCounter
  _deckIdCounter = _deckIdCounter + 1

  local pos = getNextStackWorldPos()

  local cardObj = {
    Name = "CardCustom",
    Transform = {
      posX = pos.x, posY = pos.y, posZ = pos.z,
      rotX = 0, rotY = 180, rotZ = 0,
      scaleX = 1, scaleY = 1, scaleZ = 1
    },
    Nickname = buildNickname(data),
    Description = buildDescription(data),
    CardID = deckId * 100,
    CustomDeck = {
      [tostring(deckId)] = {
        FaceURL = face,
        BackURL = BACK_URL,
        NumWidth = 1,
        NumHeight = 1,
        BackIsHidden = true
      }
    }
  }

  spawnObjectJSON({ json = JSON.encode(cardObj) })
end

---------------------------------------------------------------------------
-- Chaos Commander Pack slots
-- 15 cards total:
-- 10 commons (2 of each mono-color) + 5 singles
---------------------------------------------------------------------------
local BASE_FILTER = "game:paper -is:digital -is:funny"

local CHAOS_SLOTS = {
  { q = "rarity:common c=w", n = 2 },
  { q = "rarity:common c=u", n = 2 },
  { q = "rarity:common c=b", n = 2 },
  { q = "rarity:common c=r", n = 2 },
  { q = "rarity:common c=g", n = 2 },

  { q = "rarity:uncommon", n = 1 },
  { q = "(rarity:rare OR rarity:mythic)", n = 1 },
  { q = "f:standard", n = 1 },
  { q = "f:historic", n = 1 },
  { q = "t:legendary t:creature", n = 1 },
}

local function buildQueryListFromSlots()
  local list = {}
  for _, slot in ipairs(CHAOS_SLOTS) do
    local count = tonumber(slot.n) or 1
    for _ = 1, count do
      table.insert(list, slot.q)
    end
  end
  return list
end

local function fetchAndSpawnOne(query)
  local fullQ = (query or "") .. " " .. BASE_FILTER
  local url = SCRY_BASE .. "/cards/random?q=" .. urlEncode(fullQ)
  queueRequest(url, function(ok, body)
    if ok then
      spawnCardFromJson(body)
    end
  end)
end

---------------------------------------------------------------------------
-- Button action (cooldown + lock + timeout)
---------------------------------------------------------------------------
function spawnChaosCommanderPack()
  local now = os.time()

  -- Safety: unlock if we somehow got stuck
  forceUnlockIfTimedOut()

  if _isSpawning then
    print("Spawner already running.")
    return
  end

  if now < _cooldownUntil then
    print("Spawner on cooldown (" .. (_cooldownUntil - now) .. "s remaining)")
    return
  end

  local queries = buildQueryListFromSlots()
  local packSize = #queries

  if packSize > MAX_PACK_SIZE then
    print("Safety cap hit: packSize too high (" .. packSize .. ").")
    return
  end

  -- Lock + timers
  _isSpawning = true
  _spawnEndsAt = now + SPAWN_TIMEOUT_SECONDS
  _cooldownUntil = now + COOLDOWN_SECONDS

  -- Reset stack height each time so you always get a single pile
  _stackIndex = 0

  for i = 1, packSize do
    local q = queries[i]
    schedule(function()
      fetchAndSpawnOne(q)
    end, (i - 1) * 0.01)
  end

  -- Unlock after expected queue time + buffer
  schedule(function()
    _isSpawning = false
  end, (packSize * MIN_DELAY) + 2)
end
_G["spawnChaosCommanderPack"] = spawnChaosCommanderPack

---------------------------------------------------------------------------
-- Init
---------------------------------------------------------------------------
function onLoad()
  math.randomseed(os.time())

  self.createButton({
    click_function = "spawnChaosCommanderPack",
    function_owner = self,
    label          = "Spawn Chaos Commander Pack",
    position       = {0, BTN_Y, 0},
    rotation       = {0, 180, 0},
    width          = 2400,
    height         = 520,
    font_size      = 160,
    color          = Color.Grey
  })
end

