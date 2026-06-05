const findById = (collection, id) => collection.find((item) => item.id === id);

const init = () => {
  const id = getQueryParam('id');
  const beneficio = obterColecao(STORAGE_COLECOES.beneficios, id) ?? { id: '', name: 'beneficio', eligibleCount: 0 };

  document.getElementById('header-slot').innerHTML = renderHeader({
    title: 'Desativar benefício',
    backHref: `/src/pages/colaborador/beneficios/editar.html?id=${encodeURIComponent(beneficio.id)}`
  });

  const corpo = `
    <section class="desativar-body">
      ${renderStatusCircle({ variant: 'warning' })}
      <h1 class="desativar-title">Desativar "${escapeHtml(beneficio.name)}"?</h1>
      ${renderImpactBox({
        title: 'O que muda',
        items: [
          'Não aparecerá mais nas buscas dos cidadãos',
          `${beneficio.eligibleCount.toLocaleString('pt-BR')} cidadãos elegíveis serão notificados`,
          'Atendimentos em andamento serão sinalizados'
        ]
      })}
      <p class="desativar-note">Você poderá reativar a qualquer momento pelo Painel.</p>
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
    definirStatusColecao(STORAGE_COLECOES.beneficios, beneficio.id, 'inativo');
    window.location.href = '/src/pages/colaborador/beneficios/lista.html';
  });
};

document.addEventListener('DOMContentLoaded', init);
