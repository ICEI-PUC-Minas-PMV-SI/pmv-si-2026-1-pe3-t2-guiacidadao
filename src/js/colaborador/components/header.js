const renderHeaderHero = ({ brand = 'GuiaCidadao', subtitle, initials }) => {
  const subtitleMarkup = subtitle ? `<div class="header-hero-subtitle">${escapeHtml(subtitle)}</div>` : '';
  const avatarMarkup = initials ? `<div class="header-hero-avatar">${escapeHtml(initials)}</div>` : '';
  return `
    <header class="app-header-hero">
      <div>
        <div class="header-hero-brand">${escapeHtml(brand)}</div>
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
      <div>
        <div class="header-title">${escapeHtml(title)}</div>
        ${subtitleMarkup}
      </div>
    </header>
  `;
};

const renderHeader = (props) => {
  if (props.hero) return renderHeaderHero(props);
  return renderHeaderBar(props);
};

globalThis.renderHeader = renderHeader;
