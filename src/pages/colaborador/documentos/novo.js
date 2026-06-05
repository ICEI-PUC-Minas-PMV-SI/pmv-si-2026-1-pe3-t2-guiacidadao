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
  document.getElementById('header-slot').innerHTML = renderHeader({
    title: 'Novo documento',
    backHref: '/src/pages/colaborador/documentos/lista.html'
  });

  const hint = '<p class="form-hint-right">* Campos obrigatorios</p>';

  const campos = [
    renderInput({ label: 'Nome do documento', required: true, placeholder: 'Ex: RG', id: 'novo-nome' }),
    renderSelect({
      label: 'Categoria',
      required: true,
      placeholder: 'Selecione uma categoria',
      options: MOCK_DOCUMENTO_CATEGORIES,
      id: 'novo-categoria'
    }),
    renderTextArea({
      label: 'Orientacao de obtencao',
      required: true,
      placeholder: 'Explique em linguagem simples como o cidadao consegue este documento.',
      id: 'novo-orientacao'
    })
  ].join('');

  const toggleRow = renderToggleRow(
    'Pode ser marcado como "nao aplicavel"?',
    'O cidadao pode indicar que o item nao se aplica ao seu caso.',
    'novo-optional',
    false
  );

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
      ${toggleRow}
      ${acoes}
    </div>
  `;

  document.getElementById('btn-cancelar').addEventListener('click', () => {
    if (confirm('Descartar alteracoes?')) {
      window.location.href = '/src/pages/colaborador/documentos/lista.html';
    }
  });

  document.getElementById('btn-salvar').addEventListener('click', () => {
    const nome = document.getElementById('novo-nome').value.trim();
    if (!nome) {
      alert('Preencha o nome do documento.');
      return;
    }
    alert('Documento salvo (mock).');
    window.location.href = '/src/pages/colaborador/documentos/lista.html';
  });

  wireToggle('novo-optional');
};

document.addEventListener('DOMContentLoaded', init);
