const init = () => {
  document.getElementById('header-slot').innerHTML = renderHeader({
    title: 'Alterar senha',
    backHref: '/src/pages/colaborador/perfil/perfil.html'
  });

  const fields = [
    renderInput({ label: 'Senha atual', type: 'password', required: true, id: 'senha-atual' }),
    renderInput({ label: 'Nova senha', type: 'password', required: true, id: 'senha-nova' }),
    renderInput({ label: 'Confirmar nova senha', type: 'password', required: true, id: 'senha-confirma' })
  ].join('');

  const regras = renderImpactBox({
    title: 'Sua senha deve ter:',
    items: ['Minimo 8 caracteres', '1 letra maiuscula e 1 numero', '1 caractere especial']
  });

  const acoes = `
    <div class="auth-actions">
      ${renderButton({ children: 'Cancelar', variant: 'outline', id: 'btn-cancelar' })}
      ${renderButton({ children: 'Salvar', id: 'btn-salvar' })}
    </div>
  `;

  document.getElementById('main-slot').innerHTML = fields + regras + acoes;

  document.getElementById('btn-cancelar').addEventListener('click', () => {
    window.history.back();
  });

  document.getElementById('btn-salvar').addEventListener('click', () => {
    const atual = document.getElementById('senha-atual').value;
    const nova = document.getElementById('senha-nova').value;
    const confirma = document.getElementById('senha-confirma').value;
    if (!atual || !nova || !confirma) {
      alert('Preencha todos os campos.');
      return;
    }
    if (nova !== confirma) {
      alert('A nova senha e a confirmação não coincidem.');
      return;
    }
    alert('Senha alterada com sucesso (mock).');
    window.history.back();
  });
};

document.addEventListener('DOMContentLoaded', init);
