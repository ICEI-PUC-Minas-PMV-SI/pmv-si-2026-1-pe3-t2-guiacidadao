const obterSessao = () => {
  try {
    const raw = localStorage.getItem('usuarioLogado');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const removerUsuarioDaLista = (id, cpf, email) => {
  const lista = JSON.parse(localStorage.getItem('userlist') ?? '[]');
  const restante = lista.filter((u) => {
    const mesmoId = id && u.id === id;
    const mesmoCpf = cpf && u.cpf === cpf;
    const mesmoEmail = email && (u.email ?? '').toLowerCase() === email.toLowerCase();
    return !(mesmoId || mesmoCpf || mesmoEmail);
  });
  localStorage.setItem('userlist', JSON.stringify(restante));
};

const limparDadosDoUsuario = (userId) => {
  if (!userId) return;
  const prefixos = [`familia_${userId}`, `guiacidadao:quiz:${userId}`, `guiacidadao:checklist:${userId}`, `recuperacao_${userId}`];
  prefixos.forEach((k) => localStorage.removeItem(k));
};

const init = () => {
  const btn = document.getElementById('btn-excluir-conta');
  if (!btn) return;

  btn.addEventListener('click', () => {
    const sessao = obterSessao();
    if (!sessao) {
      alert('Nenhum usuário logado.');
      window.location.href = '/src/pages/login/login.html';
      return;
    }

    const confirmar = confirm('Excluir sua conta apaga seus dados (perfil familiar, quiz e checklist) deste dispositivo. Esta ação é definitiva. Deseja continuar?');
    if (!confirmar) return;

    const userId = sessao.id ?? sessao.cpf ?? sessao.email;
    removerUsuarioDaLista(sessao.id, sessao.cpf, sessao.email);
    limparDadosDoUsuario(userId);
    localStorage.removeItem('usuarioLogado');

    alert('Conta excluída. Você será redirecionado para o login.');
    window.location.href = '/src/pages/login/login.html';
  });
};

document.addEventListener('DOMContentLoaded', init);
