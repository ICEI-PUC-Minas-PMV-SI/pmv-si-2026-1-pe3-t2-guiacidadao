const init = () => {
  document.getElementById('header-slot').innerHTML = renderHeader({
    title: 'Primeiro acesso',
    backHref: '/src/pages/login/login.html'
  });

  const intro = `
    <section class="auth-intro">
      <h1 class="auth-intro-title">Bem-vindo(a)!</h1>
      <p class="auth-intro-message">Sua senha provisoria precisa ser substituida por uma nova antes de continuar.</p>
    </section>
  `;

  const formFields = [
    renderInput({ label: 'Nova senha', type: 'password', required: true, placeholder: 'Digite sua nova senha', id: 'nova-senha' }),
    renderInput({ label: 'Confirmar nova senha', type: 'password', required: true, placeholder: 'Repita a nova senha', id: 'confirmar-senha' })
  ].join('');

  const regras = renderImpactBox({
    title: 'Sua senha deve ter:',
    items: ['Minimo 8 caracteres', '1 letra maiuscula e 1 numero', '1 caractere especial (!@#$...)']
  });

  const acoes = `<div class="auth-actions">${renderButton({ children: 'Definir senha', id: 'btn-definir' })}</div>`;

  document.getElementById('main-slot').innerHTML = intro + formFields + regras + acoes;

  document.getElementById('btn-definir').addEventListener('click', () => {
    const nova = document.getElementById('nova-senha').value;
    const confirma = document.getElementById('confirmar-senha').value;
    if (!nova || !confirma) {
      alert('Preencha os dois campos de senha.');
      return;
    }
    if (nova !== confirma) {
      alert('As senhas nao coincidem.');
      return;
    }
    alert('Senha definida com sucesso (mock).');
    window.location.href = '/src/pages/colaborador/painel/painel.html';
  });
};

document.addEventListener('DOMContentLoaded', init);
