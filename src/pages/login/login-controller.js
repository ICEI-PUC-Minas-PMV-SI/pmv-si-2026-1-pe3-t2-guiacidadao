const DESTINOS = {
  cidadao: '/src/pages/home/home.html',
  colaborador: '/src/pages/colaborador/painel/painel.html'
};

const detectarPapelAtivo = (tabContainer) => {
  const ativa = tabContainer.querySelector('.auth-tab--active');
  return ativa?.dataset.tab ?? 'cidadao';
};

const validarCidadao = async ({ ident, senha }) => {
  if (!ident || !senha) {
    return { valido: false, mensagem: 'Preencha CPF/email e senha.' };
  }
  const lista = JSON.parse(localStorage.getItem('userlist') ?? '[]');
  const identNorm = ident.trim().toLowerCase();
  const cpfNorm = typeof limparCpf === 'function' ? limparCpf(ident) : ident;

  const candidato = lista.find((u) => {
    const cpfStored = typeof limparCpf === 'function' ? limparCpf(u.cpf) : u.cpf;
    const emailStored = (u.email ?? '').toLowerCase();
    return cpfStored === cpfNorm || emailStored === identNorm;
  });

  if (!candidato) {
    return { valido: false, mensagem: 'Credenciais inválidas.' };
  }

  const senhaOk = await compararSenha(senha, candidato.pass);
  if (!senhaOk) {
    return { valido: false, mensagem: 'Credenciais inválidas.' };
  }

  if (!senhaEhHash(candidato.pass)) {
    candidato.pass = await hashSenha(senha);
    const indice = lista.findIndex((u) => u === candidato);
    lista[indice] = candidato;
    localStorage.setItem('userlist', JSON.stringify(lista));
  }

  return { valido: true, usuario: candidato };
};

const validarColaborador = ({ ident, senha }) => {
  if (!ident || !senha) {
    return { valido: false, mensagem: 'Preencha email institucional e senha.' };
  }
  return { valido: true, usuario: MOCK_PROFILE };
};

const validarCredencial = async (papel, credencial) => {
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
