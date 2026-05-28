const renderSectionTitle = ({ children, hint }) => {
  const hintMarkup = hint ? `<span class="section-title-hint">${escapeHtml(hint)}</span>` : '';
  return `<div class="section-title-row"><h2 class="section-title">${escapeHtml(children)}</h2>${hintMarkup}</div>`;
};

globalThis.renderSectionTitle = renderSectionTitle;
