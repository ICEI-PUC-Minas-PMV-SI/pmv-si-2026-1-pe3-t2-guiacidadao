const HEADER_LOGO_HTML = `<img src="/src/assets/icons/Logo.png" alt="GuiaCidadao" class="header-logo-img">`;

const renderHeaderHero = ({ subtitle, initials }) => {
  const subtitleMarkup = subtitle ? `<div class="header-hero-subtitle">${escapeHtml(subtitle)}</div>` : '';
  const avatarMarkup = initials ? `<div class="header-hero-avatar">${escapeHtml(initials)}</div>` : '';
  return `
    <header class="app-header-hero">
      <div class="header-hero-brand-block">
        ${HEADER_LOGO_HTML}
        ${subtitleMarkup}
      </div>
      ${avatarMarkup}
    </header>
  `;
};

const renderHeaderBar = ({ title, subtitle, backHref }) => {
  const backMarkup = backHref
    ? `<a class="back-btn" href="${escapeHtml(backHref)}" aria-label="Voltar">&larr;</a>`
    : '';
  const subtitleMarkup = subtitle ? `<div class="header-subtitle">${escapeHtml(subtitle)}</div>` : '';
  return `
    <header class="app-header">
      ${backMarkup}
      <div class="header-title-block">
        ${HEADER_LOGO_HTML}
        <div class="header-title-text">
          <div class="header-title">${escapeHtml(title)}</div>
          ${subtitleMarkup}
        </div>
      </div>
    </header>
  `;
};

const renderHeader = (props) => {
  if (props.hero) return renderHeaderHero(props);
  return renderHeaderBar(props);
};

globalThis.renderHeader = renderHeader;
