const renderMenuItem = ({ iconHtml = '', title, subtitle, href, id }) => {
  const subtitleMarkup = subtitle ? `<span class="menu-item-subtitle">${escapeHtml(subtitle)}</span>` : '';
  const inner = `
    <span class="menu-item-icon">${iconHtml}</span>
    <span class="menu-item-text">
      <span class="menu-item-title">${escapeHtml(title)}</span>
      ${subtitleMarkup}
    </span>
    <span class="menu-item-chevron">&rsaquo;</span>
  `;
  if (href) {
    return `<a class="menu-item" href="${escapeHtml(href)}">${inner}</a>`;
  }
  const idAttr = id ? ` id="${escapeHtml(id)}"` : '';
  return `<button type="button" class="menu-item"${idAttr}>${inner}</button>`;
};

globalThis.renderMenuItem = renderMenuItem;
