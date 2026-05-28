const renderToggle = ({ active = false, id, ariaLabel }) => {
  const idAttr = id ? ` id="${escapeHtml(id)}"` : '';
  const ariaLabelAttr = ariaLabel ? ` aria-label="${escapeHtml(ariaLabel)}"` : '';
  const className = active ? 'toggle toggle--active' : 'toggle';
  return `<button type="button" role="switch" aria-checked="${active}" class="${className}"${idAttr}${ariaLabelAttr}><span class="toggle-thumb"></span></button>`;
};

globalThis.renderToggle = renderToggle;
