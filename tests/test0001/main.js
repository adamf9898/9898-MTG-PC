document.getElementById('randomBtn').addEventListener('click', () => {
  if (cards.length === 0) return;
  const randomCard = cards[Math.floor(Math.random() * cards.length)];
  document.getElementById('output').textContent = JSON.stringify(randomCard, null, 2);
});
// --- Config ---
const CHUNKS = 53; // cards-0.json to cards-52.json
const CHUNK_DIR = 'split-cards';

function getRandomChunkFile() {
  const idx = Math.floor(Math.random() * CHUNKS);
  return `${CHUNK_DIR}/cards-${idx}.json`;
}

async function getRandomCard() {
  const chunkFile = getRandomChunkFile();
  const res = await fetch(chunkFile);
  if (!res.ok) throw new Error('Failed to load ' + chunkFile);
  const cards = await res.json();
  if (!Array.isArray(cards) || cards.length === 0) throw new Error('Chunk is empty');
  return cards[Math.floor(Math.random() * cards.length)];
}

function renderCardJSON(card) {
  document.getElementById('output').textContent = JSON.stringify(card, null, 2);
}

function renderCardName(card) {
  document.getElementById('output').textContent = card.name || '(No name field)';
}

function renderCardDetails(card) {
  const output = document.getElementById('output');
  output.innerHTML = '';
  for (const [key, value] of Object.entries(card)) {
    const div = document.createElement('div');
    div.innerHTML = `<strong>${key}:</strong> ${typeof value === 'object' ? JSON.stringify(value) : value}`;
    output.appendChild(div);
  }
}

function renderCardTable(card) {
  const output = document.getElementById('output');
  let html = '<table border="1" cellpadding="4" style="border-collapse:collapse;">';
  for (const [key, value] of Object.entries(card)) {
    html += `<tr><td><strong>${key}</strong></td><td>${typeof value === 'object' ? JSON.stringify(value) : value}</td></tr>`;
  }
  html += '</table>';
  output.innerHTML = html;
}

function bindButton(id, renderer) {
  const btn = document.getElementById(id);
  btn.disabled = false;
  btn.addEventListener('click', async () => {
    const output = document.getElementById('output');
    output.textContent = 'Loading random chunk...';
    try {
      const card = await getRandomCard();
      renderer(card);
    } catch (e) {
      output.textContent = 'Error: ' + e.message;
    }
  });
}

window.addEventListener('DOMContentLoaded', () => {
  bindButton('randomBtn', renderCardJSON);
  bindButton('nameBtn', renderCardName);
  bindButton('detailsBtn', renderCardDetails);
  bindButton('tableBtn', renderCardTable);
});
