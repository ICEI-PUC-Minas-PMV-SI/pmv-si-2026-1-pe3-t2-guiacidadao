const BADGE_VARIANT = {
  ativo: { variant: 'success', label: 'Ativo' },
  inativo: { variant: 'danger', label: 'Inativo' },
  pendente: { variant: 'warning', label: 'Pendente' }
};

let estado = { busca: '', filtro: 'todos' };

const filtrarItens = () => {
  const termo = estado.busca.trim().toLowerCase();
  return MOCK_BENEFICIOS.filter((item) => {
    const matchBusca = !termo || item.name.toLowerCase().includes(termo) || item.agency.toLowerCase().includes(termo);
    const matchFiltro = estado.filtro === 'todos' || item.status === estado.filtro;
    return matchBusca && matchFiltro;
  });
};

const renderListaItens = (itens) => {
  if (itens.length === 0) {
    return '<p class="lista-empty">Nenhum beneficio encontrado.</p>';
  }
  return itens.map((item) => {
    const badge = BADGE_VARIANT[item.status] ?? BADGE_VARIANT.ativo;
    return renderListItem({
      title: item.name,
      subtitle: item.agency,
      badgeHtml: renderBadge({ children: badge.label, variant: badge.variant }),
      href: `/src/pages/colaborador/beneficios/detalhes.html?id=${encodeURIComponent(item.id)}`
    });
  }).join('');
};

const atualizarLista = () => {
  const filtrados = filtrarItens();
  document.getElementById('lista-itens').innerHTML = renderListaItens(filtrados);
  document.getElementById('lista-count').textContent = `${filtrados.length} cadastrados`;
};

const renderToolbar = () => `
  <div class="beneficios-toolbar">
    ${renderSearchBar({ placeholder: 'Buscar beneficio...', id: 'beneficios-busca' })}
    ${renderIconButton({ children: '+', ariaLabel: 'Adicionar benefício', id: 'btn-add-beneficio' })}
  </div>
`;

const renderFiltros = () => `
  <div class="beneficios-filtros">
    ${MOCK_BENEFICIO_STATUS_OPTIONS.map((opt) => renderFilterPill({
      label: opt.label,
      count: opt.total,
      active: opt.value === estado.filtro,
      id: `filtro-${opt.value}`
    })).join('')}
  </div>
`;

const renderCountRow = () => `
  <div class="beneficios-count-row">
    <span class="beneficios-count-label">Todos os beneficios</span>
    <span class="beneficios-count-total" id="lista-count"></span>
  </div>
`;

const renderConteudoPrincipal = () => {
  return renderToolbar() + renderFiltros() + renderCountRow() + '<div id="lista-itens" class="beneficios-lista"></div>';
};

const wireBusca = () => {
  document.getElementById('beneficios-busca').addEventListener('input', (event) => {
    estado.busca = event.target.value;
    atualizarLista();
  });
};

const wireFiltros = () => {
  MOCK_BENEFICIO_STATUS_OPTIONS.forEach((opt) => {
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
  document.getElementById('btn-add-beneficio').addEventListener('click', () => {
    window.location.href = '/src/pages/colaborador/beneficios/novo.html';
  });
};

const init = () => {
  document.getElementById('header-slot').innerHTML = renderHeader({
    title: 'Catálogo de Benefícios',
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
