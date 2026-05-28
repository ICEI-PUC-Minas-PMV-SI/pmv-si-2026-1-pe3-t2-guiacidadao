const renderStatCard = ({ value, label, hint, href, id }) => {
  const hintMarkup = hint ? `<span class="stat-card-hint">${escapeHtml(hint)}</span>` : '';
  const inner = `<span class="stat-card-value">${escapeHtml(value)}</span><span class="stat-card-label">${escapeHtml(label)}</span>${hintMarkup}`;
  if (href) {
    return `<a class="stat-card" href="${escapeHtml(href)}">${inner}</a>`;
  }
  const idAttr = id ? ` id="${escapeHtml(id)}"` : '';
  return `<button type="button" class="stat-card"${idAttr}>${inner}</button>`;
};

globalThis.renderStatCard = renderStatCard;
