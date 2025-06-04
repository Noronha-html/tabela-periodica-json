let elementos = [];

fetch('dados_quimica.json')
  .then(r => r.json())
  .then(data => {
    elementos = data;
    for (let period = 1; period <= 7; period++) {
      renderRow(period, `tr${period}`);
    }
    renderRow(8, 'lan');
    renderRow(9, 'act');
    attachClickHandlers();
  })
  .catch(err => console.error(err));

function renderRow(linha, rowId) {
  const row = document.getElementById(rowId);
  for (let col = 1; col <= 18; col++) {
    const td = document.createElement('td');
    td.classList.add('element');

    const el = elementos.find(e => e.linha === linha && e.coluna === col);
    if (el && el.simbolo) {
      td.innerHTML = `
        <span class="z">${el.numeroAtomico}</span>
        <span class="simble">${el.simbolo}</span>
        <h1 class="name">${el.nome}</h1>
        <span class="mace">${el.massaAtomica}</span>
      `;
      td.dataset.atomic = el.numeroAtomico;
      td.dataset.symbol = el.simbolo;
      const grp = normalizeGroup(el.grupo);
      td.classList.add(`group-${grp}`);
    } else {
      td.style.visibility = 'hidden';
    }
    row.appendChild(td);
  }
}

function normalizeGroup(grupo) {
  return grupo.toLowerCase()
    .normalize('NFD')
    .replace(/[^a-z\s-]/g, '')
    .replace(/\s+/g, '-');
}

function attachClickHandlers() {
  document.querySelectorAll('.element').forEach(cell => {
    if (cell.dataset.atomic) {
      cell.addEventListener('click', () => {
        const atomNum = cell.dataset.atomic;
        const el = elementos.find(e => e.numeroAtomico === atomNum);
        if (el) showInfo(el);
      });
    }
  });
  document.getElementById('close-btn').addEventListener('click', () => {
    document.getElementById('info-panel').classList.add('hidden');
  });
}

function showInfo(el) {
  const panel = document.getElementById('info-panel');
  const content = document.getElementById('info-content');
  content.innerHTML = `
    <h2>${el.nome} (${el.simbolo})</h2>
    <p><strong>Número Atômico:</strong> ${el.numeroAtomico}</p>
    <p><strong>Massa Atômica:</strong> ${el.massaAtomica}</p>
    <p><strong>Configuração Eletrônica:</strong> ${el.configuracaoEletronica}</p>
    <p><strong>Eletronegatividade:</strong> ${el.eletronegatividade || '—'}</p>
    <p><strong>Estado Padrão:</strong> ${el.estadoPadrao}</p>
    <p><strong>Tipo de Ligação:</strong> ${el.tipoDeLigacao}</p>
    <p><strong>Ponto de Fusão:</strong> ${el.pontoDeFusao} °C</p>
    <p><strong>Ponto de Ebulição:</strong> ${el.pontoDeEbulicao} °C</p>
    <p><strong>Descoberto em:</strong> ${el.anoDeDescoberta}</p>
  `;
  panel.classList.remove('hidden');
}

function calcularCarga() {
  const n = parseFloat(document.getElementById('n-value').value);
  const e = parseFloat(document.getElementById('e-value').value);
  if (isNaN(n) || isNaN(e)) return alert('Preencha todos os valores');
  const q = n * e;
  document.getElementById('resultado-carga').textContent = `Q = ${q} C`;
}

function calcularForca() {
  const q1 = parseFloat(document.getElementById('q1').value);
  const q2 = parseFloat(document.getElementById('q2').value);
  const d = parseFloat(document.getElementById('distancia').value);
  const k = parseFloat(document.getElementById('k-valor').value);
  if (isNaN(q1) || isNaN(q2) || isNaN(d) || isNaN(k)) return alert('Preencha todos os valores');
  const f = (k * q1 * q2) / (d * d);
  document.getElementById('resultado-forca').textContent = `F = ${f} N`;
}