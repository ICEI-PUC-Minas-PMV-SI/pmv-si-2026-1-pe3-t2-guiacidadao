let estado = { busca: '', filtro: 'todos' };

const FILTROS = [{ value: 'todos', label: 'Todos' }, ...MOCK_DOCUMENTO_CATEGORIES];

const labelDaCategoria = (value) => {
  const cat = MOCK_DOCUMENTO_CATEGORIES.find((c) => c.value === value);
  return cat?.label ?? '—';
};

const filtrarItens = () => {
  const termo = estado.busca.trim().toLowerCase();
  return listarColecao(STORAGE_COLECOES.documentos).filter((doc) => {
    const matchBusca = !termo || doc.name.toLowerCase().includes(termo);
    const matchFiltro = estado.filtro === 'todos' || doc.category === estado.filtro;
    return matchBusca && matchFiltro;
  });
};

const renderListaItens = (itens) => {
  if (itens.length === 0) {
    return '<p class="lista-empty">Nenhum documento encontrado.</p>';
  }
  return itens.map((doc) => renderListItem({
    title: doc.name,
    subtitle: labelDaCategoria(doc.category),
    href: `/src/pages/colaborador/documentos/editar.html?id=${encodeURIComponent(doc.id)}`
  })).join('');
};

const atualizarLista = () => {
  const filtrados = filtrarItens();
  document.getElementById('lista-itens').innerHTML = renderListaItens(filtrados);
  document.getElementById('lista-count').textContent = `${filtrados.length} no total`;
};

const renderToolbar = () => `
  <div class="beneficios-toolbar">
    ${renderSearchBar({ placeholder: 'Buscar documento...', id: 'documentos-busca' })}
    ${renderIconButton({ children: '+', ariaLabel: 'Adicionar documento', id: 'btn-add-documento' })}
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
    <span class="beneficios-count-label">Documentos cadastrados</span>
    <span class="beneficios-count-total" id="lista-count"></span>
  </div>
`;

const renderConteudoPrincipal = () => {
  return renderToolbar() + renderFiltros() + renderCountRow() + '<div id="lista-itens" class="beneficios-lista"></div>';
};

const wireBusca = () => {
  document.getElementById('documentos-busca').addEventListener('input', (event) => {
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
  document.getElementById('btn-add-documento').addEventListener('click', () => {
    window.location.href = '/src/pages/colaborador/documentos/novo.html';
  });
};

const init = () => {
  document.getElementById('header-slot').innerHTML = renderHeader({
    title: 'Biblioteca de Documentos',
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
