const renderBottomSheet = ({ title, body = '', closeId, backdropId }) => {
  const backdropIdAttr = backdropId ? ` id="${escapeHtml(backdropId)}"` : '';
  const closeIdAttr = closeId ? ` id="${escapeHtml(closeId)}"` : '';
  return `
    <div class="bottom-sheet-backdrop"${backdropIdAttr}></div>
    <section class="bottom-sheet" role="dialog" aria-modal="true">
      <span class="bottom-sheet-grabber"></span>
      <header class="bottom-sheet-header">
        <h2 class="bottom-sheet-title">${escapeHtml(title)}</h2>
        <button type="button" class="bottom-sheet-close"${closeIdAttr} aria-label="Fechar">&times;</button>
      </header>
      <div class="bottom-sheet-body">${body}</div>
    </section>
  `;
};

globalThis.renderBottomSheet = renderBottomSheet;
