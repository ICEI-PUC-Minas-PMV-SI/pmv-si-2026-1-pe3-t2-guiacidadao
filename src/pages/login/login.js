const TABS = ['cidadao', 'colaborador'];

const renderCamposCidadao = () => {
  return [
    renderInput({ label: 'CPF ou Email', placeholder: 'Ex: 000.000.000-00', name: 'ident', id: 'cidadao-ident' }),
    renderInput({ label: 'Senha', type: 'password', placeholder: 'Sua senha', name: 'senha', id: 'cidadao-senha' })
  ].join('');
};

const renderAcoesCidadao = () => {
  return [
    renderButton({ children: 'Entrar', type: 'submit', id: 'btn-entrar-cidadao' }),
    `<div class="auth-links">
      <a href="/src/pages/forgot_pass/forgot.html" class="btn-link">Esqueci minha senha</a>
      <a href="/src/pages/register/register.html" class="btn-link">Criar conta</a>
    </div>`
  ].join('');
};

const renderCamposColaborador = () => {
  return [
    renderInput({ label: 'E-mail institucional', type: 'email', placeholder: 'nome@org.gov.br', name: 'ident', id: 'colab-ident' }),
    renderInput({ label: 'Senha', type: 'password', placeholder: 'Digite sua senha', name: 'senha', id: 'colab-senha' })
  ].join('');
};

const renderAcoesColaborador = () => {
  return [
    renderButton({ children: 'Entrar', type: 'submit', id: 'btn-entrar-colab' }),
    `<div class="auth-links">
      <a href="/src/pages/colaborador/recuperar-senha/recuperar-senha.html" class="btn-link">Esqueci minha senha</a>
    </div>`
  ].join('');
};

const trocarTab = (papel) => {
  document.querySelectorAll('.auth-tab').forEach((tab) => {
    tab.classList.toggle('auth-tab--active', tab.dataset.tab === papel);
  });
  TABS.forEach((p) => {
    const card = document.getElementById(`form-${p}`);
    card.classList.toggle('auth-card--hidden', p !== papel);
  });
};

const submeterCidadao = async (event) => {
  event.preventDefault();
  const ident = document.getElementById('cidadao-ident').value.trim();
  const senha = document.getElementById('cidadao-senha').value;
  const result = await validarCredencial('cidadao', { ident, senha });
  if (!result.valido) {
    alert(result.mensagem);
    return;
  }
  salvarSessao(result.usuario, 'cidadao');
  window.location.href = obterDestinoRedirect('cidadao');
};

const submeterColaborador = async (event) => {
  event.preventDefault();
  const ident = document.getElementById('colab-ident').value.trim();
  const senha = document.getElementById('colab-senha').value;
  const result = await validarCredencial('colaborador', { ident, senha });
  if (!result.valido) {
    alert(result.mensagem);
    return;
  }
  salvarSessao(result.usuario, 'colaborador');
  window.location.href = obterDestinoRedirect('colaborador');
};

const init = () => {
  document.getElementById('cidadao-fields').innerHTML = renderCamposCidadao();
  document.getElementById('cidadao-actions').innerHTML = renderAcoesCidadao();
  document.getElementById('colaborador-fields').innerHTML = renderCamposColaborador();
  document.getElementById('colaborador-actions').innerHTML = renderAcoesColaborador();

  document.querySelectorAll('.auth-tab').forEach((tab) => {
    tab.addEventListener('click', () => trocarTab(tab.dataset.tab));
  });

  document.getElementById('form-cidadao').addEventListener('submit', submeterCidadao);
  document.getElementById('form-colaborador').addEventListener('submit', submeterColaborador);
};

document.addEventListener('DOMContentLoaded', init);
