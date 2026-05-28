const renderChip = ({ children, variant = 'filled', removeId }) => {
  const removeBtn = removeId
    ? `<button type="button" class="chip-remove" id="${escapeHtml(removeId)}" aria-label="Remover">&times;</button>`
    : '';
  return `<span class="chip chip--${escapeHtml(variant)}">${escapeHtml(children)}${removeBtn}</span>`;
};

globalThis.renderChip = renderChip;
