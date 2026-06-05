const findById = (collection, id) => collection.find((item) => item.id === id);

const init = () => {
  const id = getQueryParam('id');
  const documento = obterColecao(STORAGE_COLECOES.documentos, id) ?? { id: '', name: 'documento' };

  document.getElementById('header-slot').innerHTML = renderHeader({
    title: 'Desativar documento',
    backHref: `/src/pages/colaborador/documentos/editar.html?id=${encodeURIComponent(documento.id)}`
  });

  const corpo = `
    <section class="desativar-body">
      ${renderStatusCircle({ variant: 'warning' })}
      <h1 class="desativar-title">Desativar "${escapeHtml(documento.name)}"?</h1>
      ${renderImpactBox({
        title: 'O que muda',
        items: [
          'O documento saira das listas de cadastros novos',
          'Cidadãos com checklist em andamento serão notificados',
          'Benefícios que dependem dele serão sinalizados'
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
    alert('Documento desativado (mock).');
    window.location.href = '/src/pages/colaborador/documentos/lista.html';
  });
};

document.addEventListener('DOMContentLoaded', init);
