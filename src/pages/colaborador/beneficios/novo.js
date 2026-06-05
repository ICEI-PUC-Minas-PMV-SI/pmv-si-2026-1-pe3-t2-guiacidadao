const init = () => {
  document.getElementById('header-slot').innerHTML = renderHeader({
    title: 'Adicionar benefício',
    subtitle: 'Novo cadastro',
    backHref: '/src/pages/colaborador/beneficios/lista.html'
  });

  const hint = '<p class="form-hint-right">* Campos obrigatórios</p>';

  const campos = [
    renderInput({ label: 'Nome do benefício', required: true, placeholder: 'Ex: Bolsa Família', id: 'novo-nome' }),
    renderInput({ label: 'Órgão responsável', required: true, placeholder: 'Ex: Governo Federal / MDS', id: 'novo-orgao' }),
    renderTextArea({ label: 'Descrição resumida', required: true, placeholder: 'Em linguagem acessível, explique para quem serve este benefício.', id: 'novo-descricao' })
  ].join('');

  const requisitos = renderChipList({
    label: 'Requisitos de elegibilidade',
    required: true,
    items: [{ id: 'tmp-1', label: 'Renda per capita <= R$218' }],
    emptyLabel: 'Nenhum requisito vinculado.',
    addLabel: '+ Adicionar',
    addId: 'btn-add-requisito'
  });

  const documentos = renderChipList({
    label: 'Documentos necessarios',
    items: [
      { id: 'tmp-rg', label: 'RG' },
      { id: 'tmp-cpf', label: 'CPF' }
    ],
    emptyLabel: 'Nenhum documento vinculado.',
    addLabel: '+ Adicionar',
    addId: 'btn-add-documento'
  });

  const linkInput = renderInput({ label: 'Link oficial (gov.br)', placeholder: 'https://www.gov.br/...', id: 'novo-link' });

  const statusRow = `
    <div class="form-status-row">
      <div class="form-status-text">
        <span class="form-status-label">Status inicial</span>
        <span class="form-status-hint">Quando ativado, o beneficio fica visivel para os cidadãos.</span>
      </div>
      <button type="button" role="switch" aria-checked="true" class="toggle toggle--active" id="novo-status"><span class="toggle-thumb"></span></button>
    </div>
  `;

  const acoes = `
    <div class="form-actions">
      ${renderButton({ children: 'Cancelar', variant: 'outline', id: 'btn-cancelar' })}
      ${renderButton({ children: 'Publicar', id: 'btn-publicar' })}
    </div>
  `;

  document.getElementById('main-slot').innerHTML = `
    <div class="form-shell">
      ${hint}
      ${campos}
      ${renderDivider()}
      ${requisitos}
      ${renderDivider()}
      ${documentos}
      ${renderDivider()}
      ${linkInput}
      ${statusRow}
      ${acoes}
    </div>
  `;

  document.getElementById('btn-cancelar').addEventListener('click', () => {
    if (confirm('Descartar alterações?')) {
      window.location.href = '/src/pages/colaborador/beneficios/lista.html';
    }
  });

  document.getElementById('btn-publicar').addEventListener('click', () => {
    const nome = document.getElementById('novo-nome').value.trim();
    if (!nome) {
      alert('Preencha o nome do benefício.');
      return;
    }
    alert('Benefício publicado (mock).');
    window.location.href = '/src/pages/colaborador/beneficios/lista.html';
  });

  document.getElementById('btn-add-requisito').addEventListener('click', () => {
    window.location.href = '/src/pages/colaborador/modais/adicionar-requisito.html';
  });

  document.getElementById('btn-add-documento').addEventListener('click', () => {
    window.location.href = '/src/pages/colaborador/modais/adicionar-documento.html';
  });

  document.getElementById('novo-status').addEventListener('click', (event) => {
    const btn = event.currentTarget;
    const active = btn.getAttribute('aria-checked') === 'true';
    btn.setAttribute('aria-checked', String(!active));
    btn.classList.toggle('toggle--active', !active);
  });
};

document.addEventListener('DOMContentLoaded', init);
