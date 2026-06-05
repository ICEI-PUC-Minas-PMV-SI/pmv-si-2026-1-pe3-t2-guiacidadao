const init = () => {
  document.getElementById('header-slot').innerHTML = renderHeader({
    title: 'Novo requisito',
    backHref: '/src/pages/colaborador/requisitos/lista.html'
  });

  const hint = '<p class="form-hint-right">* Campos obrigatórios</p>';

  const campos = [
    renderInput({ label: 'Nome do requisito', required: true, placeholder: 'Ex: Renda per capita <= R$ 218', id: 'novo-nome' }),
    renderSelect({
      label: 'Categoria',
      required: true,
      placeholder: 'Selecione uma categoria',
      options: MOCK_REQUISITO_CATEGORIES,
      id: 'novo-categoria'
    }),
    renderTextArea({
      label: 'Descrição em linguagem simples',
      required: true,
      placeholder: 'Explique este requisito em palavras claras para o cidadão.',
      id: 'novo-descricao'
    })
  ].join('');

  const paramBlock = `
    <section class="param-block">
      <span class="param-title">Parametro de avaliacao</span>
      <span class="param-hint">Valor numerico usado pelo sistema para calcular a elegibilidade automaticamente.</span>
      <div class="param-row">
        ${renderInput({ placeholder: 'Ex: 218.00', id: 'novo-valor' })}
        ${renderSelect({ options: MOCK_OPERADORES, value: 'lte', id: 'novo-operador' })}
      </div>
    </section>
  `;

  const acoes = `
    <div class="form-actions">
      ${renderButton({ children: 'Cancelar', variant: 'outline', id: 'btn-cancelar' })}
      ${renderButton({ children: 'Salvar', id: 'btn-salvar' })}
    </div>
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
    if (confirm('Descartar alterações?')) {
      window.location.href = '/src/pages/colaborador/requisitos/lista.html';
    }
  });

  document.getElementById('btn-salvar').addEventListener('click', () => {
    const nome = document.getElementById('novo-nome').value.trim();
    if (!nome) {
      alert('Preencha o nome do requisito.');
      return;
    }
    alert('Requisito salvo (mock).');
    window.location.href = '/src/pages/colaborador/requisitos/lista.html';
  });
};

document.addEventListener('DOMContentLoaded', init);
