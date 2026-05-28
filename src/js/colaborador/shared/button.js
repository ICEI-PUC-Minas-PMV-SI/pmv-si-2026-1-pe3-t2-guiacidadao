const BUTTON_CLASS_MAP = {
  primary: 'btn btn-primary',
  outline: 'btn btn-outline',
  danger: 'btn btn-danger',
  link: 'btn-link'
};

const renderButton = ({ children, variant = 'primary', type = 'button', disabled = false, id }) => {
  const className = BUTTON_CLASS_MAP[variant] ?? BUTTON_CLASS_MAP.primary;
  const idAttr = id ? ` id="${escapeHtml(id)}"` : '';
  const disabledAttr = disabled ? ' disabled' : '';
  return `<button class="${className}" type="${escapeHtml(type)}"${idAttr}${disabledAttr}>${escapeHtml(children)}</button>`;
};

globalThis.renderButton = renderButton;
