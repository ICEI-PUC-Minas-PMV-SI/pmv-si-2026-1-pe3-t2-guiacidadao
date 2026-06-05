const NAV_ITENS = [
  {
    key: 'home',
    label: 'Home',
    href: '/src/pages/home/home.html',
    icon: '<svg width="21" height="21" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    paths: ['/src/pages/home/']
  },
  {
    key: 'beneficios',
    label: 'Meus Benefícios',
    href: '/src/pages/meus-beneficios/dashboard.html',
    icon: '<svg width="21" height="21" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
    paths: ['/src/pages/meus-beneficios/', '/src/pages/quiz/', '/src/pages/triagem/', '/src/pages/simulacao/', '/src/pages/benefits/']
  },
  {
    key: 'agendamentos',
    label: 'Agendamentos',
    href: '/src/pages/agendamento/meus_agendamentos.html',
    icon: '<svg width="21" height="21" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>',
    paths: ['/src/pages/agendamento/', '/src/pages/unidades/']
  },
  {
    key: 'perfil',
    label: 'Meu Perfil',
    href: '/src/pages/meu-perfil/meu-perfil.html',
    icon: '<svg width="21" height="21" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>',
    paths: ['/src/pages/meu-perfil/', '/src/pages/perfil-familiar/', '/src/pages/endereco/']
  }
];

const detectarItemAtivo = () => {
  const pathname = window.location.pathname;
  for (const item of NAV_ITENS) {
    if (item.paths.some((p) => pathname.startsWith(p))) {
      return item.key;
    }
  }
  return null;
};

const renderBottomNavCidadao = (activeKey) => {
  const ativo = activeKey ?? detectarItemAtivo();
  const itens = NAV_ITENS.map((item) => {
    const cls = item.key === ativo ? 'bottom-nav-item bottom-nav-item--active' : 'bottom-nav-item';
    return `<a class="${cls}" href="${item.href}">${item.icon}<span class="bottom-nav-label">${item.label}</span></a>`;
  }).join('');
  return `<nav class="bottom-nav" aria-label="Navegação principal">${itens}</nav>`;
};

const montarBottomNavCidadao = () => {
  const slot = document.getElementById('bottom-nav-slot');
  if (slot) {
    slot.outerHTML = renderBottomNavCidadao();
  }
};

document.addEventListener('DOMContentLoaded', montarBottomNavCidadao);

globalThis.renderBottomNavCidadao = renderBottomNavCidadao;
