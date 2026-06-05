const elFeedback = () => document.getElementById('forgot-feedback');

const buscarUsuario = (ident) => {
  const lista = JSON.parse(localStorage.getItem('userlist') ?? '[]');
  const cpfNorm = typeof limparCpf === 'function' ? limparCpf(ident) : ident;
  const emailNorm = ident.trim().toLowerCase();
  return lista.find((u) => {
    const cpfStored = typeof limparCpf === 'function' ? limparCpf(u.cpf) : u.cpf;
    const emailStored = (u.email ?? '').toLowerCase();
    return cpfStored === cpfNorm || emailStored === emailNorm;
  });
};

const gerarCodigo = () => Math.floor(100000 + Math.random() * 900000).toString();

const init = () => {
  const btn = document.getElementById('btn-enviar-codigo');
  const input = document.getElementById('rec-id');
  if (!btn || !input) return;

  btn.addEventListener('click', () => {
    const ident = input.value.trim();
    const feedback = elFeedback();
    if (!ident) {
      if (feedback) feedback.textContent = 'Informe um CPF ou e-mail.';
      return;
    }

    const usuario = buscarUsuario(ident);
    if (!usuario) {
      if (feedback) feedback.textContent = 'Não encontramos uma conta com esse CPF ou e-mail.';
      return;
    }

    const codigo = gerarCodigo();
    localStorage.setItem(`recuperacao_${usuario.id ?? usuario.cpf}`, JSON.stringify({ codigo, criadoEm: new Date().toISOString() }));
    if (feedback) {
      feedback.innerHTML = `Código de verificação enviado para <strong>${usuario.email}</strong>.<br>Para fins de demonstração, seu código é: <strong>${codigo}</strong>.<br><a href="/src/pages/login/login.html">Voltar para o login</a>`;
    }
  });
};

document.addEventListener('DOMContentLoaded', init);
