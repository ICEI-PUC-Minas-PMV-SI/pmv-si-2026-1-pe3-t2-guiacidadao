const renderFilterPill = ({ label, active = false, count, id }) => {
  const className = active ? 'filter-pill filter-pill--active' : 'filter-pill';
  const idAttr = id ? ` id="${escapeHtml(id)}"` : '';
  const countText = typeof count === 'number' ? ` &middot; ${count}` : '';
  return `<button type="button" class="${className}"${idAttr}>${escapeHtml(label)}${countText}</button>`;
};

globalThis.renderFilterPill = renderFilterPill;
