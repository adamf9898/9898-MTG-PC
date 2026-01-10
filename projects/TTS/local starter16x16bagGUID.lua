local starter16x16bagGUID
local starter20x20bagGUID
local fortress16x16bagGUID
local fortress20x20bagGUID
local openField16x16bagGUID
local openField20x20bagGUID
local diagonal16x16bagGUID
local diagonal20x20bagGUID
local splitFormations16x16bagGUID
local splitFormations20x20bagGUID
local oldTown16x16bagGUID
local oldTown20x20bagGUID
local castle16x16bagGUID
local castle20x20bagGUID
local ruins16x16bagGUID
local ruins20x20bagGUID
local swamp16x16bagGUID
local swamp20x20bagGUID
local river16x16bagGUID
local river20x20bagGUID
local village16x16bagGUID
local village20x20bagGUID
local multiplayer16x16bagGUID
local multiplayer20x20bagGUID

local lastButtonGUID ="none"
local numberOfPlayers

function onLoad(save_state)
    starter16x16bagGUID = "20b0ff"
    starter20x20bagGUID = "adfd68"
    fortress16x16bagGUID = "636c72"
    fortress20x20bagGUID = "481217"
    openField16x16bagGUID = "a587cd"
    openField20x20bagGUID = "73b691"
    diagonal16x16bagGUID = "c46021"
    diagonal20x20bagGUID = "199a20"
    splitFormations16x16bagGUID = "7dd7aa"
    splitFormations20x20bagGUID = "42ae46"
    oldTown16x16bagGUID = "4784d8"
    oldTown20x20bagGUID = "9ec96c"
    castle16x16bagGUID = "f3c5bd"
    castle20x20bagGUID = "0aaf5d"
    ruins16x16bagGUID = "4f79e9"
    ruins20x20bagGUID = "3e22d7"
    swamp16x16bagGUID = "03ec69"
    swamp20x20bagGUID = "f74d12"
    river16x16bagGUID = "bae5e4"
    river20x20bagGUID = "76d225"
    village16x16bagGUID = "da0bf4"
    village20x20bagGUID = "d647c7"
    multiplayer16x16bagGUID = "2d8142"
    multiplayer20x20bagGUID = "d82cab"
    --numberOfPlayers = Player.getPlayers()
    --UI.setAttribute("cleanup", "offsetXY", "0 -".. tostring(#numberOfPlayers*20+30))
    numberOfPlayers = 1
    UI.setAttribute("cleanup", "offsetXY", "0 -".. tostring(numberOfPlayers*20+30))
end

do -- #region: setup functions
    function setupStarter16x16(player, elementID)
        getObjectFromGUID(starter16x16bagGUID).call("buttonClick_place")
        setCleanupButton(starter16x16bagGUID, elementID)
    end
    function setupStarter20x20(player, elementID)
        getObjectFromGUID(starter20x20bagGUID).call("buttonClick_place")
        setCleanupButton(starter20x20bagGUID, elementID)
    end
    function setupFortress16x16(player, elementID)
        getObjectFromGUID(fortress16x16bagGUID).call("buttonClick_place")
        setCleanupButton(fortress16x16bagGUID, elementID)
    end
    function setupFortress20x20(player, elementID)
        getObjectFromGUID(fortress20x20bagGUID).call("buttonClick_place")
        setCleanupButton(fortress20x20bagGUID, elementID)
    end
    function setupOpenField16x16(player, elementID)
        getObjectFromGUID(openField16x16bagGUID).call("buttonClick_place")
        setCleanupButton(openField16x16bagGUID, elementID)
    end
    function setupOpenField20x20(player, elementID)
        getObjectFromGUID(openField20x20bagGUID).call("buttonClick_place")
        setCleanupButton(openField20x20bagGUID, elementID)
    end
    function setupDiagonal16x16(player, elementID)
        getObjectFromGUID(diagonal16x16bagGUID).call("buttonClick_place")
        setCleanupButton(diagonal16x16bagGUID, elementID)
    end
    function setupDiagonal20x20(player, elementID)
        getObjectFromGUID(diagonal20x20bagGUID).call("buttonClick_place")
        setCleanupButton(diagonal20x20bagGUID, elementID)
    end
    function setupSplitFormations16x16(player, elementID)
        getObjectFromGUID(splitFormations16x16bagGUID).call("buttonClick_place")
        setCleanupButton(splitFormations16x16bagGUID, elementID)
    end
    function setupSplitFormations20x20(player, elementID)
        getObjectFromGUID(splitFormations20x20bagGUID).call("buttonClick_place")
        setCleanupButton(splitFormations20x20bagGUID, elementID)
    end
    function setupOldTown16x16(player, elementID)
        getObjectFromGUID(oldTown16x16bagGUID).call("buttonClick_place")
        setCleanupButton(oldTown16x16bagGUID, elementID)
    end
    function setupOldTown20x20(player, elementID)
        getObjectFromGUID(oldTown20x20bagGUID).call("buttonClick_place")
        setCleanupButton(oldTown20x20bagGUID, elementID)
    end
    function setupCastle16x16(player, elementID)
        getObjectFromGUID(castle16x16bagGUID).call("buttonClick_place")
        setCleanupButton(castle16x16bagGUID, elementID)
    end
    function setupCastle20x20(player, elementID)
        getObjectFromGUID(castle20x20bagGUID).call("buttonClick_place")
        setCleanupButton(castle20x20bagGUID, elementID)
    end
    function setupRuins16x16(player, elementID)
        getObjectFromGUID(ruins16x16bagGUID).call("buttonClick_place")
        setCleanupButton(ruins16x16bagGUID, elementID)
    end
    function setupRuins20x20(player, elementID)
        getObjectFromGUID(ruins20x20bagGUID).call("buttonClick_place")
        setCleanupButton(ruins20x20bagGUID, elementID)
    end
    function setupSwamp16x16(player, elementID)
        getObjectFromGUID(swamp16x16bagGUID).call("buttonClick_place")
        setCleanupButton(swamp16x16bagGUID, elementID)
    end
    function setupSwamp20x20(player, elementID)
        getObjectFromGUID(swamp20x20bagGUID).call("buttonClick_place")
        setCleanupButton(swamp20x20bagGUID, elementID)
    end
    function setupRiver16x16(player, elementID)
        getObjectFromGUID(river16x16bagGUID).call("buttonClick_place")
        setCleanupButton(river16x16bagGUID, elementID)
    end
    function setupRiver20x20(player, elementID)
        getObjectFromGUID(river20x20bagGUID).call("buttonClick_place")
        setCleanupButton(river20x20bagGUID, elementID)
    end
    function setupVillage16x16(player, elementID)
        getObjectFromGUID(village16x16bagGUID).call("buttonClick_place")
        setCleanupButton(village16x16bagGUID, elementID)
    end
    function setupVillage20x20(player, elementID)
        getObjectFromGUID(village20x20bagGUID).call("buttonClick_place")
        setCleanupButton(village20x20bagGUID, elementID)
    end
    function setupMultiplayer16x16(player, elementID)
        getObjectFromGUID(multiplayer16x16bagGUID).call("buttonClick_place")
        setCleanupButton(multiplayer16x16bagGUID, elementID)
    end
    function setupMultiplayer20x20(player, elementID)
        getObjectFromGUID(multiplayer20x20bagGUID).call("buttonClick_place")
        setCleanupButton(multiplayer20x20bagGUID, elementID)
    end
end

function setCleanupButton(bagGUIDUsed, elementID)
    lastButtonGUID = bagGUIDUsed
    UI.setAttribute("mapSelection", "active", false)
    UI.setAttribute("cleanup", "active", true)
    UI.setAttribute("cleanupButton", "text", "Cleanup      the table")
end

function switchCleanupToClose(player, elementID)
    UI.setAttribute("mapSelection", "active", false)
    UI.setAttribute("cleanup", "active", true)
    UI.setAttribute("cleanupButton", "text", "Show Map Selection")
end

function onCleanup(player, elementID)
    if lastButtonGUID ~= "none" then
        getObjectFromGUID(lastButtonGUID).call("buttonClick_recall")
    end
    UI.setAttribute("mapSelection", "active", true)
    UI.setAttribute("cleanup", "active", false)
end