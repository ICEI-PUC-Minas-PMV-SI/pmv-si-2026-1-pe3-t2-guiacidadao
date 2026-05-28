const STATUS_CIRCLE_GLYPHS = {
  warning: '!',
  danger: '!',
  success: '&check;'
};

const renderStatusCircle = ({ variant = 'warning' }) => {
  const safeVariant = STATUS_CIRCLE_GLYPHS[variant] ? variant : 'warning';
  const glyph = STATUS_CIRCLE_GLYPHS[safeVariant];
  return `<div class="status-circle status-circle--${safeVariant}"><span class="status-circle-glyph">${glyph}</span></div>`;
};

globalThis.renderStatusCircle = renderStatusCircle;
