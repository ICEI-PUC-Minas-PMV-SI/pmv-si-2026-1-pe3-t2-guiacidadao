const obterUsuario = () => getStorage('usuarioLogado') ?? MOCK_PROFILE;

const renderIdentity = (usuario) => `
  <section class="perfil-identity">
    <div class="perfil-avatar">${escapeHtml(usuario.initials ?? 'CL')}</div>
    <h1 class="perfil-name">${escapeHtml(usuario.fullName ?? 'Colaborador')}</h1>
    <span class="perfil-role">${escapeHtml(usuario.role ?? 'Colaborador')}</span>
    <span class="perfil-org">${escapeHtml(usuario.organization ?? '')}</span>
  </section>
`;

const renderForm = (usuario) => `
  <div class="perfil-fields">
    ${renderInput({ label: 'Nome completo', required: true, value: usuario.fullName ?? '', id: 'perfil-nome' })}
    ${renderInput({ label: 'E-mail institucional', type: 'email', required: true, value: usuario.email ?? '', id: 'perfil-email' })}
    ${renderInput({ label: 'Telefone', value: usuario.phone ?? '', placeholder: '(00) 00000-0000', id: 'perfil-telefone' })}
  </div>
`;

const renderActions = () => `
  <a class="btn btn-outline" href="/src/pages/colaborador/alterar-senha/alterar-senha.html">Alterar senha</a>
  <div class="perfil-actions">
    ${renderButton({ children: 'Cancelar', variant: 'outline', id: 'btn-cancelar' })}
    ${renderButton({ children: 'Salvar', id: 'btn-salvar' })}
  </div>
  <button class="btn btn-outline btn-danger-outline" id="btn-sair">Sair da conta</button>
`;

const init = () => {
  const usuario = obterUsuario();

  document.getElementById('header-slot').innerHTML = renderHeader({
    title: 'Meu perfil',
    backHref: '/src/pages/colaborador/painel/painel.html'
  });

  document.getElementById('main-slot').innerHTML = `
    <div class="perfil-shell">
      ${renderIdentity(usuario)}
      ${renderForm(usuario)}
      ${renderActions()}
    </div>
  `;

  document.getElementById('bottom-slot').innerHTML = renderBottomNav('perfil');

  document.getElementById('btn-cancelar').addEventListener('click', () => {
    window.history.back();
  });

  document.getElementById('btn-salvar').addEventListener('click', () => {
    alert('Alteracoes salvas (mock).');
    window.history.back();
  });

  document.getElementById('btn-sair').addEventListener('click', () => {
    if (!confirm('Tem certeza que deseja sair?')) return;
    removeStorage('usuarioLogado');
    window.location.href = '/src/pages/login/login.html';
  });
};

document.addEventListener('DOMContentLoaded', init);
