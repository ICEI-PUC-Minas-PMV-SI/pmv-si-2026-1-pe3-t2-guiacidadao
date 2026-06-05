const init = () => {
  document.getElementById('header-slot').innerHTML = renderHeader({
    title: 'Descartar alterações',
    backHref: '/src/pages/colaborador/painel/painel.html'
  });

  const corpo = `
    <section class="desativar-body">
      ${renderStatusCircle({ variant: 'warning' })}
      <h1 class="desativar-title">Tem certeza?</h1>
      <p class="desativar-note">Você tem alterações não salvas.</p>
      ${renderImpactBox({
        title: 'O que sera perdido',
        items: [
          'Campos preenchidos do formulario',
          'Requisitos e documentos selecionados'
        ]
      })}
      <p class="desativar-note">Se sair agora, suas alteracoes serão perdidas.</p>
    </section>
    <div class="form-actions">
      ${renderButton({ children: 'Cancelar', variant: 'outline', id: 'btn-cancelar' })}
      ${renderButton({ children: 'Confirmar', variant: 'danger', id: 'btn-confirmar' })}
    </div>
  `;

  document.getElementById('main-slot').innerHTML = `<div class="desativar-shell">${corpo}</div>`;

  document.getElementById('btn-cancelar').addEventListener('click', () => {
    window.history.back();
  });

  document.getElementById('btn-confirmar').addEventListener('click', () => {
    window.location.href = '/src/pages/colaborador/painel/painel.html';
  });
};

document.addEventListener('DOMContentLoaded', init);
