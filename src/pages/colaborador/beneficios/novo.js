const parseLista = (texto) => texto.split('\n').map((l) => l.trim()).filter(Boolean);

const parseDocumentacao = (texto) => parseLista(texto).map((linha) => {
  const idx = linha.indexOf(':');
  if (idx === -1) return { label: linha, descricao: '' };
  return { label: linha.slice(0, idx).trim(), descricao: linha.slice(idx + 1).trim() };
});

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
    renderTextArea({ label: 'Descrição resumida', required: true, placeholder: 'Em linguagem acessível, explique para quem serve este benefício.', id: 'novo-descricao' }),
    renderTextArea({ label: 'Descrição detalhada (vista pelo cidadão)', placeholder: 'Texto longo que aparece na tela de detalhe do benefício no app do cidadão.', id: 'novo-descricao-longa' }),
    renderTextArea({ label: 'Quem tem direito (um item por linha)', placeholder: 'Pessoas baixa renda com 65+ anos\nPessoas com deficiência de qualquer idade', id: 'novo-quem-tem-direito' }),
    renderTextArea({ label: 'Requisitos de renda', placeholder: 'Ex: Possuir renda familiar per capita igual ou inferior a R$ 218,00.', id: 'novo-requisitos-renda' }),
    renderTextArea({ label: 'Documentação necessária (um por linha, formato "Nome: descrição")', placeholder: 'CPF: De todos os membros familiares\nRG: Documento de identificação com foto', id: 'novo-documentacao' }),
    renderInput({ label: 'Caminho do ícone', placeholder: '/src/assets/icons/bpc.png', id: 'novo-icone' }),
    renderInput({ label: 'Cor de destaque (hex)', placeholder: '#D9EEFF', id: 'novo-cor' })
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
    const statusBtn = document.getElementById('novo-status');
    const ativo = statusBtn.getAttribute('aria-checked') === 'true';
    const novo = {
      id: proximoIdColecao(STORAGE_COLECOES.beneficios, 'ben'),
      name: nome,
      agency: document.getElementById('novo-orgao').value.trim(),
      description: document.getElementById('novo-descricao').value.trim(),
      descricaoLonga: document.getElementById('novo-descricao-longa').value.trim(),
      quemTemDireito: parseLista(document.getElementById('novo-quem-tem-direito').value),
      requisitosRenda: document.getElementById('novo-requisitos-renda').value.trim(),
      documentacao: parseDocumentacao(document.getElementById('novo-documentacao').value),
      icon: document.getElementById('novo-icone').value.trim(),
      cor: document.getElementById('novo-cor').value.trim() || '#E0E0E0',
      requirements: [],
      documents: [],
      officialLink: document.getElementById('novo-link').value.trim(),
      status: ativo ? 'ativo' : 'inativo',
      eligibleCount: 0,
      updatedAt: 'agora'
    };
    salvarColecao(STORAGE_COLECOES.beneficios, novo);
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
