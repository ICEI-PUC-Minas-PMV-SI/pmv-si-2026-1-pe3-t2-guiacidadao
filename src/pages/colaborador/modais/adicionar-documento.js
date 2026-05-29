const ITEMS = MOCK_DOCUMENTOS;
const NOVO_HREF = '/src/pages/colaborador/documentos/novo.html';
const PLACEHOLDER = 'Buscar documento...';

let estado = { tab: 'biblioteca', busca: '', selecionados: {} };

const filtrarItens = () => {
  const termo = estado.busca.trim().toLowerCase();
  return ITEMS.filter((item) => !termo || item.name.toLowerCase().includes(termo));
};

const totalSelecionados = () => Object.values(estado.selecionados).filter(Boolean).length;

const renderListaBiblioteca = () => {
  const itens = filtrarItens();
  if (itens.length === 0) {
    return '<p class="modal-empty">Nenhum item encontrado.</p>';
  }
  return itens.map((item) => {
    const checked = !!estado.selecionados[item.id];
    return `
      <button type="button" class="modal-list-item${checked ? ' modal-list-item--checked' : ''}" data-id="${escapeHtml(item.id)}">
        <span class="modal-check">${checked ? '&check;' : ''}</span>
        <span class="modal-row-text">${escapeHtml(item.name)}</span>
      </button>
    `;
  }).join('');
};

const renderTabBiblioteca = () => `
  <div class="modal-search">
    ${renderSearchBar({ placeholder: PLACEHOLDER, value: estado.busca, id: 'modal-busca' })}
  </div>
  <div class="modal-list" id="modal-list">
    ${renderListaBiblioteca()}
  </div>
  <div class="modal-footer">
    <button class="btn btn-primary" id="btn-adicionar" ${totalSelecionados() === 0 ? 'disabled' : ''}>
      Adicionar selecionados (${totalSelecionados()})
    </button>
  </div>
`;

const renderTabCriar = () => `
  <div class="modal-footer">
    <a class="btn btn-primary" href="${escapeHtml(NOVO_HREF)}">Cadastrar novo documento</a>
  </div>
`;

const renderTab = () => estado.tab === 'biblioteca' ? renderTabBiblioteca() : renderTabCriar();

const atualizarLista = () => {
  document.getElementById('modal-list').innerHTML = renderListaBiblioteca();
  const btn = document.getElementById('btn-adicionar');
  const total = totalSelecionados();
  btn.textContent = `Adicionar selecionados (${total})`;
  btn.disabled = total === 0;
};

const wireBibliotecaTab = () => {
  document.getElementById('modal-busca').addEventListener('input', (event) => {
    estado.busca = event.target.value;
    atualizarLista();
  });

  document.getElementById('modal-list').addEventListener('click', (event) => {
    const itemBtn = event.target.closest('.modal-list-item');
    if (!itemBtn) return;
    const id = itemBtn.dataset.id;
    estado.selecionados[id] = !estado.selecionados[id];
    atualizarLista();
  });

  document.getElementById('btn-adicionar').addEventListener('click', () => {
    alert(`Adicionados ${totalSelecionados()} itens (mock).`);
    window.history.back();
  });
};

const trocarTab = (tab) => {
  estado.tab = tab;
  document.querySelectorAll('.modal-tab').forEach((el) => {
    el.classList.toggle('modal-tab--active', el.dataset.tab === tab);
  });
  document.getElementById('modal-body').innerHTML = renderTab();
  if (tab === 'biblioteca') wireBibliotecaTab();
};

const init = () => {
  document.getElementById('modal-body').innerHTML = renderTab();
  wireBibliotecaTab();

  document.getElementById('btn-fechar').addEventListener('click', () => {
    window.history.back();
  });

  document.querySelectorAll('.modal-tab').forEach((el) => {
    el.addEventListener('click', () => trocarTab(el.dataset.tab));
  });
};

document.addEventListener('DOMContentLoaded', init);
