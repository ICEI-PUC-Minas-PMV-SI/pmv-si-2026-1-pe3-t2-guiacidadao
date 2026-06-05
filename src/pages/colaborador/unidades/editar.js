const findById = (collection, id) => collection.find((item) => item.id === id);

const init = () => {
  const id = getQueryParam('id');
  const unidade = findById(MOCK_UNIDADES, id);

  if (!unidade) {
    document.getElementById('header-slot').innerHTML = renderHeader({
      title: 'Editar',
      backHref: '/src/pages/colaborador/unidades/lista.html'
    });
    document.getElementById('main-slot').innerHTML = '<p class="lista-empty">Unidade não encontrada.</p>';
    return;
  }

  document.getElementById('header-slot').innerHTML = renderHeader({
    title: 'Editar unidade',
    subtitle: `Editando: ${unidade.name}`,
    backHref: '/src/pages/colaborador/unidades/lista.html'
  });

  const hint = '<p class="form-hint-right">* Campos obrigatórios</p>';

  const camposTopo = [
    renderInput({ label: 'Nome da unidade', required: true, value: unidade.name, id: 'editar-nome' }),
    renderSelect({
      label: 'Tipo',
      required: true,
      value: unidade.type,
      options: MOCK_UNIDADE_TYPES,
      id: 'editar-tipo'
    }),
    renderInput({ label: 'Endereco completo', required: true, value: unidade.address, id: 'editar-endereco' })
  ].join('');

  const splitRow = `
    <div class="split-row">
      ${renderInput({ label: 'CEP', required: true, value: unidade.cep, id: 'editar-cep' })}
      ${renderInput({ label: 'Telefone', value: unidade.phone, id: 'editar-telefone' })}
    </div>
  `;

  const horario = renderInput({
    label: 'Horario de funcionamento',
    required: true,
    value: unidade.schedule,
    id: 'editar-horario'
  });

  const acoes = `
    <div class="form-actions">
      ${renderButton({ children: 'Cancelar', variant: 'outline', id: 'btn-cancelar' })}
      ${renderButton({ children: 'Salvar alterações', id: 'btn-salvar' })}
    </div>
    <button class="btn btn-outline btn-danger-outline" id="btn-desativar">Desativar unidade</button>
  `;

  document.getElementById('main-slot').innerHTML = `
    <div class="form-shell">
      ${hint}
      ${camposTopo}
      ${splitRow}
      ${horario}
      ${acoes}
    </div>
  `;

  document.getElementById('btn-cancelar').addEventListener('click', () => {
    if (confirm('Descartar alterações?')) window.history.back();
  });

  document.getElementById('btn-salvar').addEventListener('click', () => {
    alert('Alteracoes salvas (mock).');
    window.location.href = '/src/pages/colaborador/unidades/lista.html';
  });

  document.getElementById('btn-desativar').addEventListener('click', () => {
    window.location.href = `/src/pages/colaborador/unidades/desativar.html?id=${encodeURIComponent(unidade.id)}`;
  });
};

document.addEventListener('DOMContentLoaded', init);
