const renderInput = ({ label, value = '', placeholder = '', type = 'text', required = false, hint, name, id }) => {
  const labelText = required ? `${escapeHtml(label)} *` : escapeHtml(label);
  const nameAttr = name ? ` name="${escapeHtml(name)}"` : '';
  const idAttr = id ? ` id="${escapeHtml(id)}"` : '';
  const hintMarkup = hint ? `<span class="form-hint">${escapeHtml(hint)}</span>` : '';
  return `
    <label class="form-group">
      <span class="form-label">${labelText}</span>
      <input class="form-input" type="${escapeHtml(type)}" value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}"${nameAttr}${idAttr}>
      ${hintMarkup}
    </label>
  `;
};

globalThis.renderInput = renderInput;
