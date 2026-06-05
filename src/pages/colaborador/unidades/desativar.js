const findById = (collection, id) => collection.find((item) => item.id === id);

const init = () => {
  const id = getQueryParam('id');
  const unidade = obterColecao(STORAGE_COLECOES.unidades, id) ?? { id: '', name: 'unidade' };

  document.getElementById('header-slot').innerHTML = renderHeader({
    title: 'Desativar unidade',
    backHref: `/src/pages/colaborador/unidades/editar.html?id=${encodeURIComponent(unidade.id)}`
  });

  const corpo = `
    <section class="desativar-body">
      ${renderStatusCircle({ variant: 'warning' })}
      <h1 class="desativar-title">Desativar "${escapeHtml(unidade.name)}"?</h1>
      ${renderImpactBox({
        title: 'O que muda',
        items: [
          'Não aparecerá mais nas buscas de localização',
          'Atendimentos em andamento serão sinalizados',
          'Cidadãos próximos serão notificados'
        ]
      })}
      <p class="desativar-note">Você poderá reativar a qualquer momento pelo Painel.</p>
    </section>
    <div class="form-actions">
      ${renderButton({ children: 'Cancelar', variant: 'outline', id: 'btn-cancelar' })}
      ${renderButton({ children: 'Desativar', variant: 'danger', id: 'btn-confirmar' })}
    </div>
  `;

  document.getElementById('main-slot').innerHTML = `<div class="desativar-shell">${corpo}</div>`;

  document.getElementById('btn-cancelar').addEventListener('click', () => {
    window.history.back();
  });

  document.getElementById('btn-confirmar').addEventListener('click', () => {
    alert('Unidade desativada (mock).');
    window.location.href = '/src/pages/colaborador/unidades/lista.html';
  });
};

document.addEventListener('DOMContentLoaded', init);
