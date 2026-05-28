const BADGE_VARIANTS = new Set(['success', 'warning', 'info', 'danger']);

const renderBadge = ({ children, variant = 'success' }) => {
  const safeVariant = BADGE_VARIANTS.has(variant) ? variant : 'success';
  return `<span class="badge badge-${safeVariant}">${escapeHtml(children)}</span>`;
};

globalThis.renderBadge = renderBadge;
