const findById = (collection, id) => collection.find((item) => item.id === id);

const renderToggleRow = (titulo, hint, id, active) => `
  <div class="form-status-row">
    <div class="form-status-text">
      <span class="form-status-label">${escapeHtml(titulo)}</span>
      <span class="form-status-hint">${escapeHtml(hint)}</span>
    </div>
    <button type="button" role="switch" aria-checked="${active}" class="toggle${active ? ' toggle--active' : ''}" id="${escapeHtml(id)}"><span class="toggle-thumb"></span></button>
  </div>
`;

const wireToggle = (id) => {
  document.getElementById(id).addEventListener('click', (event) => {
    const btn = event.currentTarget;
    const active = btn.getAttribute('aria-checked') === 'true';
    btn.setAttribute('aria-checked', String(!active));
    btn.classList.toggle('toggle--active', !active);
  });
};

const init = () => {
  const id = getQueryParam('id');
  const documento = findById(MOCK_DOCUMENTOS, id);

  if (!documento) {
    document.getElementById('header-slot').innerHTML = renderHeader({
      title: 'Editar',
      backHref: '/src/pages/colaborador/documentos/lista.html'
    });
    document.getElementById('main-slot').innerHTML = '<p class="lista-empty">Documento nao encontrado.</p>';
    return;
  }

  document.getElementById('header-slot').innerHTML = renderHeader({
    title: 'Editar documento',
    subtitle: `Editando: ${documento.name}`,
    backHref: '/src/pages/colaborador/documentos/lista.html'
  });

  const hint = '<p class="form-hint-right">* Campos obrigatorios</p>';

  const campos = [
    renderInput({ label: 'Nome do documento', required: true, value: documento.name, id: 'editar-nome' }),
    renderSelect({
      label: 'Categoria',
      required: true,
      value: documento.category,
      options: MOCK_DOCUMENTO_CATEGORIES,
      id: 'editar-categoria'
    }),
    renderTextArea({
      label: 'Orientacao de obtencao',
      required: true,
      value: documento.guidance,
      id: 'editar-orientacao'
    })
  ].join('');

  const toggleRow = renderToggleRow(
    'Pode ser marcado como "nao aplicavel"?',
    'O cidadao pode indicar que o item nao se aplica ao seu caso.',
    'editar-optional',
    documento.optional
  );

  const acoes = `
    <div class="form-actions">
      ${renderButton({ children: 'Cancelar', variant: 'outline', id: 'btn-cancelar' })}
      ${renderButton({ children: 'Salvar alteracoes', id: 'btn-salvar' })}
    </div>
    <button class="btn btn-outline btn-danger-outline" id="btn-desativar">Desativar documento</button>
  `;

  document.getElementById('main-slot').innerHTML = `
    <div class="form-shell">
      ${hint}
      ${campos}
      ${renderDivider()}
      ${toggleRow}
      ${acoes}
    </div>
  `;

  document.getElementById('btn-cancelar').addEventListener('click', () => {
    if (confirm('Descartar alteracoes?')) window.history.back();
  });

  document.getElementById('btn-salvar').addEventListener('click', () => {
    alert('Alteracoes salvas (mock).');
    window.location.href = '/src/pages/colaborador/documentos/lista.html';
  });

  document.getElementById('btn-desativar').addEventListener('click', () => {
    window.location.href = `/src/pages/colaborador/documentos/desativar.html?id=${encodeURIComponent(documento.id)}`;
  });

  wireToggle('editar-optional');
};

document.addEventListener('DOMContentLoaded', init);
