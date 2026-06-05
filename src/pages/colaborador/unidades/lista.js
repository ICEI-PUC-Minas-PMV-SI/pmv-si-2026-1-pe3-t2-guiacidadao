let estado = { busca: '', filtro: 'todos' };

const FILTROS = [{ value: 'todos', label: 'Todos' }, ...MOCK_UNIDADE_TYPES];

const labelDoTipo = (value) => {
  const tipo = MOCK_UNIDADE_TYPES.find((t) => t.value === value);
  return tipo?.label ?? value;
};

const filtrarItens = () => {
  const termo = estado.busca.trim().toLowerCase();
  return MOCK_UNIDADES.filter((unidade) => {
    const matchBusca = !termo || unidade.name.toLowerCase().includes(termo) || unidade.address.toLowerCase().includes(termo);
    const matchFiltro = estado.filtro === 'todos' || unidade.type === estado.filtro;
    return matchBusca && matchFiltro;
  });
};

const renderListaItens = (itens) => {
  if (itens.length === 0) {
    return '<p class="lista-empty">Nenhuma unidade encontrada.</p>';
  }
  return itens.map((unidade) => renderListItem({
    title: unidade.name,
    subtitle: `${labelDoTipo(unidade.type)} · ${unidade.address}`,
    badgeHtml: unidade.status === 'inativo' ? renderBadge({ children: 'Inativo', variant: 'danger' }) : '',
    href: `/src/pages/colaborador/unidades/editar.html?id=${encodeURIComponent(unidade.id)}`
  })).join('');
};

const atualizarLista = () => {
  const filtrados = filtrarItens();
  document.getElementById('lista-itens').innerHTML = renderListaItens(filtrados);
  document.getElementById('lista-count').textContent = `${filtrados.length} no total`;
};

const renderToolbar = () => `
  <div class="beneficios-toolbar">
    ${renderSearchBar({ placeholder: 'Buscar unidade...', id: 'unidades-busca' })}
    ${renderIconButton({ children: '+', ariaLabel: 'Adicionar unidade', id: 'btn-add-unidade' })}
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
    <span class="beneficios-count-label">Unidades cadastradas</span>
    <span class="beneficios-count-total" id="lista-count"></span>
  </div>
`;

const renderConteudoPrincipal = () => {
  return renderToolbar() + renderFiltros() + renderCountRow() + '<div id="lista-itens" class="beneficios-lista"></div>';
};

const wireBusca = () => {
  document.getElementById('unidades-busca').addEventListener('input', (event) => {
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
  document.getElementById('btn-add-unidade').addEventListener('click', () => {
    window.location.href = '/src/pages/colaborador/unidades/nova.html';
  });
};

const init = () => {
  document.getElementById('header-slot').innerHTML = renderHeader({
    title: 'Unidades de Atendimento',
    backHref: '/src/pages/colaborador/painel/painel.html'
  });
  document.getElementById('main-slot').innerHTML = renderConteudoPrincipal();
  document.getElementById('bottom-slot').innerHTML = renderBottomNav('unidades');

  atualizarLista();
  wireBusca();
  wireFiltros();
  wireBtnAdd();
};

document.addEventListener('DOMContentLoaded', init);
