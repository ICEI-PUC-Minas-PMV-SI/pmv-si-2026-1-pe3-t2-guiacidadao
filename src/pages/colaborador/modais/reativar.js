const init = () => {
  const itemName = getQueryParam('nome') ?? 'Vale-Gas Nacional';
  const returnTo = getQueryParam('returnTo') ?? '/src/pages/colaborador/painel/painel.html';

  document.getElementById('header-slot').innerHTML = renderHeader({
    title: 'Reativar item',
    backHref: returnTo
  });

  const corpo = `
    <section class="desativar-body">
      ${renderStatusCircle({ variant: 'success' })}
      <h1 class="desativar-title">Reativar "${escapeHtml(itemName)}"?</h1>
      ${renderImpactBox({
        title: 'O que muda',
        items: [
          'Voltara a aparecer nas buscas',
          'Cidadaos elegiveis serao notificados'
        ]
      })}
      <p class="desativar-note">Voce podera desativar novamente a qualquer momento.</p>
    </section>
    <div class="form-actions">
      ${renderButton({ children: 'Cancelar', variant: 'outline', id: 'btn-cancelar' })}
      ${renderButton({ children: 'Reativar', id: 'btn-confirmar' })}
    </div>
  `;

  document.getElementById('main-slot').innerHTML = `<div class="desativar-shell">${corpo}</div>`;

  document.getElementById('btn-cancelar').addEventListener('click', () => {
    window.history.back();
  });

  document.getElementById('btn-confirmar').addEventListener('click', () => {
    alert('Item reativado (mock).');
    window.location.href = returnTo;
  });
};

document.addEventListener('DOMContentLoaded', init);
