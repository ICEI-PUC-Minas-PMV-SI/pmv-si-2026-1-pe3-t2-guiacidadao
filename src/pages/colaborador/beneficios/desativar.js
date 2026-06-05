const findById = (collection, id) => collection.find((item) => item.id === id);

const init = () => {
  const id = getQueryParam('id');
  const beneficio = findById(MOCK_BENEFICIOS, id) ?? { id: '', name: 'beneficio', eligibleCount: 0 };

  document.getElementById('header-slot').innerHTML = renderHeader({
    title: 'Desativar beneficio',
    backHref: `/src/pages/colaborador/beneficios/editar.html?id=${encodeURIComponent(beneficio.id)}`
  });

  const corpo = `
    <section class="desativar-body">
      ${renderStatusCircle({ variant: 'warning' })}
      <h1 class="desativar-title">Desativar "${escapeHtml(beneficio.name)}"?</h1>
      ${renderImpactBox({
        title: 'O que muda',
        items: [
          'Nao aparecera mais nas buscas dos cidadaos',
          `${beneficio.eligibleCount.toLocaleString('pt-BR')} cidadaos elegiveis serao notificados`,
          'Atendimentos em andamento serao sinalizados'
        ]
      })}
      <p class="desativar-note">Voce podera reativar a qualquer momento pelo Painel.</p>
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
    alert('Beneficio desativado (mock).');
    window.location.href = '/src/pages/colaborador/beneficios/lista.html';
  });
};

document.addEventListener('DOMContentLoaded', init);
