const renderImpactBox = ({ title = 'O que muda', items = [] }) => {
  const itemsHtml = items.map((item) => `<li>${escapeHtml(item)}</li>`).join('');
  return `<section class="impact-box"><span class="impact-box-title">${escapeHtml(title)}</span><ul class="impact-box-list">${itemsHtml}</ul></section>`;
};

globalThis.renderImpactBox = renderImpactBox;
