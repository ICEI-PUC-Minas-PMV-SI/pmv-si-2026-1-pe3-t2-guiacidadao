const findById = (collection, id) => collection.find((item) => item.id === id);

const init = () => {
  const id = getQueryParam('id');
  const requisito = obterColecao(STORAGE_COLECOES.requisitos, id) ?? { id: '', name: 'requisito', benefitsLinked: 0 };

  document.getElementById('header-slot').innerHTML = renderHeader({
    title: 'Desativar requisito',
    backHref: `/src/pages/colaborador/requisitos/editar.html?id=${encodeURIComponent(requisito.id)}`
  });

  const corpo = `
    <section class="desativar-body">
      ${renderStatusCircle({ variant: 'warning' })}
      <h1 class="desativar-title">Desativar "${escapeHtml(requisito.name)}"?</h1>
      ${renderImpactBox({
        title: 'O que muda',
        items: [
          'Nao sera mais usado em avaliacoes de elegibilidade',
          `${requisito.benefitsLinked} benefícios serão reavaliados automaticamente`,
          'Usuários afetados serão notificados'
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
    definirStatusColecao(STORAGE_COLECOES.requisitos, requisito.id, 'inativo');
    window.location.href = '/src/pages/colaborador/requisitos/lista.html';
  });
};

document.addEventListener('DOMContentLoaded', init);
