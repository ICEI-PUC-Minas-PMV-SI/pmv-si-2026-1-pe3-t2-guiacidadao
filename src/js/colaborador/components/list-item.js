const renderListItem = ({ title, subtitle, badgeHtml = '', href, id }) => {
  const subtitleMarkup = subtitle ? `<span class="list-item-subtitle">${escapeHtml(subtitle)}</span>` : '';
  const inner = `
    <span class="list-item-text">
      <span class="list-item-title">${escapeHtml(title)}</span>
      ${subtitleMarkup}
    </span>
    <span class="list-item-right">
      ${badgeHtml}
      <span class="list-item-chevron">&rsaquo;</span>
    </span>
  `;
  if (href) {
    return `<a class="list-item" href="${escapeHtml(href)}">${inner}</a>`;
  }
  const idAttr = id ? ` id="${escapeHtml(id)}"` : '';
  return `<button type="button" class="list-item"${idAttr}>${inner}</button>`;
};

globalThis.renderListItem = renderListItem;
