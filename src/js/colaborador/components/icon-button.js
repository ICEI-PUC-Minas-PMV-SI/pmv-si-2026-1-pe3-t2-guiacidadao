const renderIconButton = ({ children = '+', ariaLabel, id }) => {
  const idAttr = id ? ` id="${escapeHtml(id)}"` : '';
  const ariaAttr = ariaLabel ? ` aria-label="${escapeHtml(ariaLabel)}"` : '';
  return `<button type="button" class="icon-button"${idAttr}${ariaAttr}>${children}</button>`;
};

globalThis.renderIconButton = renderIconButton;
