const HEADER_LOGO_HTML = `<img src="/src/assets/icons/Logo.png" alt="GuiaCidadão" class="header-logo-img">`;
const HEADER_SPACER_HTML = '<div class="header-spacer"></div>';
const HEADER_BACK_SVG = `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>`;

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
    ? `<a class="back-btn" href="${escapeHtml(backHref)}" aria-label="Voltar">${HEADER_BACK_SVG}</a>`
    : HEADER_SPACER_HTML;
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
      ${HEADER_SPACER_HTML}
    </header>
  `;
};

const renderHeader = (props) => {
  if (props.hero) return renderHeaderHero(props);
  return renderHeaderBar(props);
};

globalThis.renderHeader = renderHeader;
