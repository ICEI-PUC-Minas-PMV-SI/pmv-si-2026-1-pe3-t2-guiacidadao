const STATS = [
  { value: 17, label: 'Beneficios', hint: '12 ativos', href: '/src/pages/colaborador/beneficios/lista.html' },
  { value: 8, label: 'Documentos', hint: 'na biblioteca', href: '/src/pages/colaborador/documentos/lista.html' },
  { value: 12, label: 'Requisitos', hint: 'cadastrados', href: '/src/pages/colaborador/requisitos/lista.html' },
  { value: 6, label: 'Unidades', hint: '5 ativas', href: '/src/pages/colaborador/unidades/lista.html' }
];

const MENU_ITEMS = [
  { icon: 'beneficio', title: 'Catalogo de Beneficios', subtitle: 'Gerenciar beneficios sociais', href: '/src/pages/colaborador/beneficios/lista.html' },
  { icon: 'documento', title: 'Biblioteca de Documentos', subtitle: 'Documentos reutilizaveis', href: '/src/pages/colaborador/documentos/lista.html' },
  { icon: 'requisito', title: 'Biblioteca de Requisitos', subtitle: 'Requisitos de elegibilidade', href: '/src/pages/colaborador/requisitos/lista.html' },
  { icon: 'unidade', title: 'Unidades de Atendimento', subtitle: 'CRAS, INSS, Defensoria, etc.', href: '/src/pages/colaborador/unidades/lista.html' }
];

const obterUsuario = () => getStorage('usuarioLogado') ?? MOCK_PROFILE;

const obterPrimeiroNome = (usuario) => {
  const nomeCompleto = usuario.fullName ?? usuario.nome ?? 'Colaborador';
  return nomeCompleto.split(' ')[0];
};

const init = () => {
  const usuario = obterUsuario();

  document.getElementById('header-slot').innerHTML = renderHeader({
    hero: true,
    subtitle: 'Painel do Colaborador',
    initials: usuario.initials ?? 'CL'
  });

  const greeting = `
    <section class="painel-greeting">
      <h1 class="painel-greeting-title">Ola, ${escapeHtml(obterPrimeiroNome(usuario))}!</h1>
      <p class="painel-greeting-sub">Veja um resumo da plataforma</p>
    </section>
  `;

  const statsHtml = STATS.map((stat) => renderStatCard(stat)).join('');
  const statsGrid = `<div class="painel-stats-grid">${statsHtml}</div>`;

  const menuTitle = renderSectionTitle({ children: 'Acesso rapido' });
  const menuList = `<div class="painel-menu-list">${MENU_ITEMS.map((item) => renderMenuItem({
    iconHtml: renderIcon(item.icon, 18),
    title: item.title,
    subtitle: item.subtitle,
    href: item.href
  })).join('')}</div>`;

  document.getElementById('main-slot').innerHTML = greeting + statsGrid + menuTitle + menuList;
  document.getElementById('bottom-slot').innerHTML = renderBottomNav('inicio');
};

document.addEventListener('DOMContentLoaded', init);
