const findById = (collection, id) => collection.find((item) => item.id === id);

const init = () => {
  const id = getQueryParam('id');
  const requisito = obterColecao(STORAGE_COLECOES.requisitos, id);

  if (!requisito) {
    document.getElementById('header-slot').innerHTML = renderHeader({
      title: 'Editar',
      backHref: '/src/pages/colaborador/requisitos/lista.html'
    });
    document.getElementById('main-slot').innerHTML = '<p class="lista-empty">Requisito não encontrado.</p>';
    return;
  }

  document.getElementById('header-slot').innerHTML = renderHeader({
    title: 'Editar requisito',
    subtitle: `Editando: ${requisito.name}`,
    backHref: '/src/pages/colaborador/requisitos/lista.html'
  });

  const hint = '<p class="form-hint-right">* Campos obrigatórios</p>';

  const campos = [
    renderInput({ label: 'Nome do requisito', required: true, value: requisito.name, id: 'editar-nome' }),
    renderSelect({
      label: 'Categoria',
      required: true,
      value: requisito.category,
      options: MOCK_REQUISITO_CATEGORIES,
      id: 'editar-categoria'
    }),
    renderTextArea({
      label: 'Descrição em linguagem simples',
      required: true,
      value: requisito.description,
      id: 'editar-descricao'
    })
  ].join('');

  const paramBlock = `
    <section class="param-block">
      <span class="param-title">Parametro de avaliacao</span>
      <div class="param-row">
        ${renderInput({ value: requisito.value, id: 'editar-valor' })}
        ${renderSelect({ options: MOCK_OPERADORES, value: requisito.operator, id: 'editar-operador' })}
      </div>
    </section>
  `;

  const acoes = `
    <div class="form-actions">
      ${renderButton({ children: 'Cancelar', variant: 'outline', id: 'btn-cancelar' })}
      ${renderButton({ children: 'Salvar alterações', id: 'btn-salvar' })}
    </div>
    <button class="btn btn-outline btn-danger-outline" id="btn-desativar">Desativar requisito</button>
  `;

  document.getElementById('main-slot').innerHTML = `
    <div class="form-shell">
      ${hint}
      ${campos}
      ${renderDivider()}
      ${paramBlock}
      ${acoes}
    </div>
  `;

  document.getElementById('btn-cancelar').addEventListener('click', () => {
    if (confirm('Descartar alterações?')) window.history.back();
  });

  document.getElementById('btn-salvar').addEventListener('click', () => {
    alert('Alteracoes salvas (mock).');
    window.location.href = '/src/pages/colaborador/requisitos/lista.html';
  });

  document.getElementById('btn-desativar').addEventListener('click', () => {
    window.location.href = `/src/pages/colaborador/requisitos/desativar.html?id=${encodeURIComponent(requisito.id)}`;
  });
};

document.addEventListener('DOMContentLoaded', init);
