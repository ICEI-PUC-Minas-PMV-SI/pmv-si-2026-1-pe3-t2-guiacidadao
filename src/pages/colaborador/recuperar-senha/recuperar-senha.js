const init = () => {
  document.getElementById('header-slot').innerHTML = renderHeader({
    title: 'Recuperar senha',
    backHref: '/src/pages/login/login.html'
  });

  const intro = `
    <section class="auth-intro">
      <h1 class="auth-intro-title">Informe o e-mail cadastrado</h1>
      <p class="auth-intro-message">Enviaremos um codigo de verificacao para voce redefinir sua senha.</p>
    </section>
  `;

  const field = renderInput({
    label: 'E-mail institucional',
    type: 'email',
    required: true,
    placeholder: 'nome@org.gov.br',
    id: 'email-recuperar'
  });

  const acoes = `
    <div class="auth-actions">
      ${renderButton({ children: 'Cancelar', variant: 'outline', id: 'btn-cancelar' })}
      ${renderButton({ children: 'Enviar codigo', id: 'btn-enviar' })}
    </div>
  `;

  document.getElementById('main-slot').innerHTML = intro + field + acoes;

  document.getElementById('btn-cancelar').addEventListener('click', () => {
    window.history.back();
  });

  document.getElementById('btn-enviar').addEventListener('click', () => {
    const email = document.getElementById('email-recuperar').value.trim();
    if (!email) {
      alert('Informe o e-mail.');
      return;
    }
    alert('Codigo enviado (mock).');
    window.location.href = '/src/pages/login/login.html';
  });
};

document.addEventListener('DOMContentLoaded', init);
