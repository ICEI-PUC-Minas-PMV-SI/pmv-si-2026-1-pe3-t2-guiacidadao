const renderTextArea = ({ label, value = '', placeholder = '', required = false, rows = 4, name, id }) => {
  const labelText = required ? `${escapeHtml(label)} *` : escapeHtml(label);
  const nameAttr = name ? ` name="${escapeHtml(name)}"` : '';
  const idAttr = id ? ` id="${escapeHtml(id)}"` : '';
  return `
    <label class="form-group">
      <span class="form-label">${labelText}</span>
      <textarea class="form-input form-textarea" rows="${rows}" placeholder="${escapeHtml(placeholder)}"${nameAttr}${idAttr}>${escapeHtml(value)}</textarea>
    </label>
  `;
};

globalThis.renderTextArea = renderTextArea;
