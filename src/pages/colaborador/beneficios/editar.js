const findById = (collection, id) => collection.find((item) => item.id === id);

const toChips = (ids, source) => ids
  .map((id) => findById(source, id))
  .filter(Boolean)
  .map((item) => ({ id: item.id, label: item.name }));

const parseLista = (texto) => texto.split('\n').map((l) => l.trim()).filter(Boolean);

const parseDocumentacao = (texto) => parseLista(texto).map((linha) => {
  const idx = linha.indexOf(':');
  if (idx === -1) return { label: linha, descricao: '' };
  return { label: linha.slice(0, idx).trim(), descricao: linha.slice(idx + 1).trim() };
});

const serializarDocumentacao = (arr) => (arr ?? [])
  .map((d) => d.descricao ? `${d.label}: ${d.descricao}` : d.label)
  .join('\n');

const init = () => {
  const id = getQueryParam('id');
  const beneficio = obterColecao(STORAGE_COLECOES.beneficios, id);

  if (!beneficio) {
    document.getElementById('header-slot').innerHTML = renderHeader({
      title: 'Editar',
      backHref: '/src/pages/colaborador/beneficios/lista.html'
    });
    document.getElementById('main-slot').innerHTML = '<p class="lista-empty">Benefício não encontrado.</p>';
    return;
  }

  document.getElementById('header-slot').innerHTML = renderHeader({
    title: 'Editar benefício',
    subtitle: `Editando: ${beneficio.name}`,
    backHref: `/src/pages/colaborador/beneficios/detalhes.html?id=${encodeURIComponent(beneficio.id)}`
  });

  const hint = '<p class="form-hint-right">* Campos obrigatórios</p>';

  const campos = [
    renderInput({ label: 'Nome do benefício', required: true, value: beneficio.name, id: 'editar-nome' }),
    renderInput({ label: 'Órgão responsável', required: true, value: beneficio.agency, id: 'editar-orgao' }),
    renderTextArea({ label: 'Descrição resumida', required: true, value: beneficio.description, id: 'editar-descricao' }),
    renderTextArea({ label: 'Descrição detalhada (vista pelo cidadão)', value: beneficio.descricaoLonga ?? '', id: 'editar-descricao-longa' }),
    renderTextArea({ label: 'Quem tem direito (um item por linha)', value: (beneficio.quemTemDireito ?? []).join('\n'), id: 'editar-quem-tem-direito' }),
    renderTextArea({ label: 'Requisitos de renda', value: beneficio.requisitosRenda ?? '', id: 'editar-requisitos-renda' }),
    renderTextArea({ label: 'Documentação necessária (um por linha, formato "Nome: descrição")', value: serializarDocumentacao(beneficio.documentacao), id: 'editar-documentacao' }),
    renderInput({ label: 'Caminho do ícone', value: beneficio.icon ?? '', id: 'editar-icone' }),
    renderInput({ label: 'Cor de destaque (hex)', value: beneficio.cor ?? '', id: 'editar-cor' })
  ].join('');

  const requisitos = renderChipList({
    label: 'Requisitos de elegibilidade',
    required: true,
    items: toChips(beneficio.requirements, listarColecao(STORAGE_COLECOES.requisitos)),
    emptyLabel: 'Nenhum requisito vinculado.',
    addLabel: '+ Adicionar',
    addId: 'btn-add-requisito'
  });

  const documentos = renderChipList({
    label: 'Documentos necessarios',
    items: toChips(beneficio.documents, listarColecao(STORAGE_COLECOES.documentos)),
    emptyLabel: 'Nenhum documento vinculado.',
    addLabel: '+ Adicionar',
    addId: 'btn-add-documento'
  });

  const linkInput = renderInput({ label: 'Link oficial (gov.br)', value: beneficio.officialLink, id: 'editar-link' });

  const acoes = `
    <div class="form-actions">
      ${renderButton({ children: 'Cancelar', variant: 'outline', id: 'btn-cancelar' })}
      ${renderButton({ children: 'Salvar', id: 'btn-salvar' })}
    </div>
    <button class="btn btn-outline btn-danger-outline" id="btn-desativar">Desativar benefício</button>
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
      ${acoes}
    </div>
  `;

  document.getElementById('btn-cancelar').addEventListener('click', () => {
    if (confirm('Descartar alterações?')) window.history.back();
  });

  document.getElementById('btn-salvar').addEventListener('click', () => {
    const atualizado = {
      ...beneficio,
      name: document.getElementById('editar-nome').value.trim(),
      agency: document.getElementById('editar-orgao').value.trim(),
      description: document.getElementById('editar-descricao').value.trim(),
      descricaoLonga: document.getElementById('editar-descricao-longa').value.trim(),
      quemTemDireito: parseLista(document.getElementById('editar-quem-tem-direito').value),
      requisitosRenda: document.getElementById('editar-requisitos-renda').value.trim(),
      documentacao: parseDocumentacao(document.getElementById('editar-documentacao').value),
      icon: document.getElementById('editar-icone').value.trim(),
      cor: document.getElementById('editar-cor').value.trim() || beneficio.cor || '#E0E0E0',
      officialLink: document.getElementById('editar-link').value.trim(),
      updatedAt: 'agora'
    };
    salvarColecao(STORAGE_COLECOES.beneficios, atualizado);
    window.location.href = `/src/pages/colaborador/beneficios/detalhes.html?id=${encodeURIComponent(beneficio.id)}`;
  });

  document.getElementById('btn-desativar').addEventListener('click', () => {
    window.location.href = `/src/pages/colaborador/beneficios/desativar.html?id=${encodeURIComponent(beneficio.id)}`;
  });

  document.getElementById('btn-add-requisito').addEventListener('click', () => {
    window.location.href = '/src/pages/colaborador/modais/adicionar-requisito.html';
  });

  document.getElementById('btn-add-documento').addEventListener('click', () => {
    window.location.href = '/src/pages/colaborador/modais/adicionar-documento.html';
  });
};

document.addEventListener('DOMContentLoaded', init);
