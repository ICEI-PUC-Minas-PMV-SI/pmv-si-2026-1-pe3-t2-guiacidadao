const SEARCH_ICON_SVG = `<svg class="search-icon" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`;

const renderSearchBar = ({ value = '', placeholder = 'Buscar...', id }) => {
  const idAttr = id ? ` id="${escapeHtml(id)}"` : '';
  return `<div class="search-bar"><input class="search-input" type="text" value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}"${idAttr}>${SEARCH_ICON_SVG}</div>`;
};

globalThis.renderSearchBar = renderSearchBar;
