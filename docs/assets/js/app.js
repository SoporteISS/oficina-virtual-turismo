async function loadData(file) {
  const res = await fetch(`../assets/data/${file}`);
  return res.json();
}

(async () => {
  const pois = await loadData('pois.json');
  const events = await loadData('events.json');
  const featured = [...pois.slice(0, 4), ...events.slice(0, 2)];
  const container = document.getElementById('featured-cards');
  container.innerHTML = featured.map(item => `
    <article class="card">
      <h3>${item.name}</h3>
      <p>${item.description}</p>
    </article>
  `).join('');
})();

window.globalSearch = (e) => {
  e.preventDefault();
  const q = document.getElementById('global-search').value.toLowerCase();
  Promise.all([
    loadData('pois.json'),
    loadData('events.json')
  ]).then(([pois, events]) => {
    const all = [...pois, ...events];
    const results = all.filter(item =>
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
    alert(`Resultados (${results.length}):\n` +
      results.map(r => `- ${r.name}`).join('\n')
    );
  });
};

window.chatbotSend = (e) => {
  e.preventDefault();
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  const box = document.getElementById('chat-messages');
  box.innerHTML += `<div><strong>Tú:</strong> ${msg}</div>`;
  const ans = ["Prueba con 'qué ver en un día'", "Horarios: 10:00–14:00 y 16:00–19:00", "Cómo llegar: A-6 salida 259", "Eventos: Festival Gastronómico en octubre"];
  const reply = ans.find(a => msg.toLowerCase().includes(a.split(":")[0].toLowerCase())) || "Lo siento, no tengo información sobre eso.";
  box.innerHTML += `<div><strong>Bot:</strong> ${reply}</div>`;
  input.value = '';
  box.scrollTop = box.scrollHeight;
};
