const DESTINOS = {
  cidadao: '/src/pages/home/home.html',
  colaborador: '/src/pages/colaborador/painel/painel.html'
};

const detectarPapelAtivo = (tabContainer) => {
  const ativa = tabContainer.querySelector('.auth-tab--active');
  return ativa?.dataset.tab ?? 'cidadao';
};

const validarCidadao = ({ ident, senha }) => {
  if (!ident || !senha) {
    return { valido: false, mensagem: 'Preencha CPF/email e senha.' };
  }
  const lista = JSON.parse(localStorage.getItem('userlist') ?? '[]');
  const usuario = lista.find((u) => (u.cpf === ident || u.email === ident) && u.pass === senha);
  if (!usuario) {
    return { valido: false, mensagem: 'Credenciais invalidas.' };
  }
  return { valido: true, usuario };
};

const validarColaborador = ({ ident, senha }) => {
  if (!ident || !senha) {
    return { valido: false, mensagem: 'Preencha email institucional e senha.' };
  }
  return { valido: true, usuario: MOCK_PROFILE };
};

const validarCredencial = (papel, credencial) => {
  if (papel === 'colaborador') return validarColaborador(credencial);
  return validarCidadao(credencial);
};

const salvarSessao = (usuario, papel) => {
  localStorage.setItem('usuarioLogado', JSON.stringify({ ...usuario, role: papel }));
};

const obterDestinoRedirect = (papel) => DESTINOS[papel] ?? DESTINOS.cidadao;

globalThis.detectarPapelAtivo = detectarPapelAtivo;
globalThis.validarCredencial = validarCredencial;
globalThis.salvarSessao = salvarSessao;
globalThis.obterDestinoRedirect = obterDestinoRedirect;
