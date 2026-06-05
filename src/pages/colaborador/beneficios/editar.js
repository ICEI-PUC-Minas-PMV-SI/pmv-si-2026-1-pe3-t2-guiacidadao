const findById = (collection, id) => collection.find((item) => item.id === id);

const toChips = (ids, source) => ids
  .map((id) => findById(source, id))
  .filter(Boolean)
  .map((item) => ({ id: item.id, label: item.name }));

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
    renderTextArea({ label: 'Descrição resumida', required: true, value: beneficio.description, id: 'editar-descricao' })
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
    alert('Alteracoes salvas (mock).');
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
