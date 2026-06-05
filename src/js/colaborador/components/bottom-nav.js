const BOTTOM_NAV_ITEMS = [
  { key: 'inicio', label: 'Inicio', href: '/src/pages/colaborador/painel/painel.html', icon: 'home' },
  { key: 'beneficios', label: 'Benefícios', href: '/src/pages/colaborador/beneficios/lista.html', icon: 'beneficio' },
  { key: 'unidades', label: 'Unidades', href: '/src/pages/colaborador/unidades/lista.html', icon: 'unidade' },
  { key: 'perfil', label: 'Perfil', href: '/src/pages/colaborador/perfil/perfil.html', icon: 'perfil' }
];

const renderBottomNavItem = (item, activeKey) => {
  const className = item.key === activeKey
    ? 'bottom-nav-item bottom-nav-item--active'
    : 'bottom-nav-item';
  return `<a class="${className}" href="${escapeHtml(item.href)}">${renderIcon(item.icon)}<span class="bottom-nav-label">${escapeHtml(item.label)}</span></a>`;
};

const renderBottomNav = (activeKey) => {
  const itemsHtml = BOTTOM_NAV_ITEMS.map((item) => renderBottomNavItem(item, activeKey)).join('');
  return `<nav class="bottom-nav">${itemsHtml}</nav>`;
};

globalThis.renderBottomNav = renderBottomNav;
