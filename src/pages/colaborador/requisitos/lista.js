let estado = { busca: '', filtro: 'todos' };

const FILTROS = [{ value: 'todos', label: 'Todos' }, ...MOCK_REQUISITO_CATEGORIES];

const filtrarItens = () => {
  const termo = estado.busca.trim().toLowerCase();
  return listarColecao(STORAGE_COLECOES.requisitos).filter((req) => {
    const matchBusca = !termo || req.name.toLowerCase().includes(termo);
    const matchFiltro = estado.filtro === 'todos' || req.category === estado.filtro;
    return matchBusca && matchFiltro;
  });
};

const renderListaItens = (itens) => {
  if (itens.length === 0) {
    return '<p class="lista-empty">Nenhum requisito encontrado.</p>';
  }
  return itens.map((req) => renderListItem({
    title: req.name,
    subtitle: `${req.benefitsLinked} beneficios vinculados`,
    href: `/src/pages/colaborador/requisitos/editar.html?id=${encodeURIComponent(req.id)}`
  })).join('');
};

const atualizarLista = () => {
  const filtrados = filtrarItens();
  document.getElementById('lista-itens').innerHTML = renderListaItens(filtrados);
  document.getElementById('lista-count').textContent = `${filtrados.length} no total`;
};

const renderToolbar = () => `
  <div class="beneficios-toolbar">
    ${renderSearchBar({ placeholder: 'Buscar requisito...', id: 'requisitos-busca' })}
    ${renderIconButton({ children: '+', ariaLabel: 'Adicionar requisito', id: 'btn-add-requisito' })}
  </div>
`;

const renderFiltros = () => `
  <div class="beneficios-filtros">
    ${FILTROS.map((opt) => renderFilterPill({
      label: opt.label,
      active: opt.value === estado.filtro,
      id: `filtro-${opt.value}`
    })).join('')}
  </div>
`;

const renderCountRow = () => `
  <div class="beneficios-count-row">
    <span class="beneficios-count-label">Requisitos cadastrados</span>
    <span class="beneficios-count-total" id="lista-count"></span>
  </div>
`;

const renderConteudoPrincipal = () => {
  return renderToolbar() + renderFiltros() + renderCountRow() + '<div id="lista-itens" class="beneficios-lista"></div>';
};

const wireBusca = () => {
  document.getElementById('requisitos-busca').addEventListener('input', (event) => {
    estado.busca = event.target.value;
    atualizarLista();
  });
};

const wireFiltros = () => {
  FILTROS.forEach((opt) => {
    document.getElementById(`filtro-${opt.value}`).addEventListener('click', () => {
      estado.filtro = opt.value;
      document.getElementById('main-slot').innerHTML = renderConteudoPrincipal();
      atualizarLista();
      wireBusca();
      wireFiltros();
      wireBtnAdd();
    });
  });
};

const wireBtnAdd = () => {
  document.getElementById('btn-add-requisito').addEventListener('click', () => {
    window.location.href = '/src/pages/colaborador/requisitos/novo.html';
  });
};

const init = () => {
  document.getElementById('header-slot').innerHTML = renderHeader({
    title: 'Biblioteca de Requisitos',
    backHref: '/src/pages/colaborador/painel/painel.html'
  });
  document.getElementById('main-slot').innerHTML = renderConteudoPrincipal();
  document.getElementById('bottom-slot').innerHTML = renderBottomNav('beneficios');

  atualizarLista();
  wireBusca();
  wireFiltros();
  wireBtnAdd();
};

document.addEventListener('DOMContentLoaded', init);
