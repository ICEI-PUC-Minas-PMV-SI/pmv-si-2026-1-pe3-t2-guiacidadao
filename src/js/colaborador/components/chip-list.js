const renderChipList = ({ label, required = false, items = [], emptyLabel, addLabel, addId }) => {
  const labelMarkup = label
    ? `<span class="chip-list-label">${escapeHtml(label)}${required ? ' *' : ''}</span>`
    : '';
  const chipsHtml = items
    .map((item) => renderChip({ children: item.label, removeId: item.removeId }))
    .join('');
  const addMarkup = addLabel
    ? `<button type="button" class="chip-list-add"${addId ? ` id="${escapeHtml(addId)}"` : ''}>${escapeHtml(addLabel)}</button>`
    : '';
  const emptyMarkup = items.length === 0 && !addLabel && emptyLabel
    ? `<span class="chip-list-empty">${escapeHtml(emptyLabel)}</span>`
    : '';
  return `
    <section class="chip-list">
      ${labelMarkup}
      <div class="chip-list-items">
        ${emptyMarkup}
        ${chipsHtml}
        ${addMarkup}
      </div>
    </section>
  `;
};

globalThis.renderChipList = renderChipList;
