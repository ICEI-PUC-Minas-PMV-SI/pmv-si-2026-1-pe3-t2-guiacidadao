const SELECT_ARROW_SVG = `<svg class="form-select-arrow" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>`;

const renderSelectOption = (option, currentValue) => {
  const value = escapeHtml(option.value);
  const label = escapeHtml(option.label);
  const selected = option.value === currentValue ? ' selected' : '';
  return `<option value="${value}"${selected}>${label}</option>`;
};

const renderSelect = ({ label, value, options = [], placeholder, required = false, name, id }) => {
  const labelText = required ? `${escapeHtml(label)} *` : escapeHtml(label);
  const nameAttr = name ? ` name="${escapeHtml(name)}"` : '';
  const idAttr = id ? ` id="${escapeHtml(id)}"` : '';
  const placeholderOption = placeholder
    ? `<option value="">${escapeHtml(placeholder)}</option>`
    : '';
  const optionsHtml = options.map((option) => renderSelectOption(option, value)).join('');
  return `
    <label class="form-group">
      <span class="form-label">${labelText}</span>
      <div class="form-select-wrapper">
        <select class="form-input"${nameAttr}${idAttr}>
          ${placeholderOption}
          ${optionsHtml}
        </select>
        ${SELECT_ARROW_SVG}
      </div>
    </label>
  `;
};

globalThis.renderSelect = renderSelect;
