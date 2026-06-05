const BADGE_VARIANT = {
  ativo: { variant: 'success', label: 'Ativo' },
  inativo: { variant: 'danger', label: 'Inativo' },
  pendente: { variant: 'warning', label: 'Pendente' }
};

const findById = (collection, id) => collection.find((item) => item.id === id);

const renderSecao = (label, valor) => `
  <section class="detalhes-secao">
    <span class="detalhes-label">${escapeHtml(label)}</span>
    <span class="detalhes-valor">${escapeHtml(valor)}</span>
  </section>
`;

const renderListaSecao = (label, itens, prefixo) => {
  if (itens.length === 0) {
    return renderSecao(label, 'Nenhum cadastrado.');
  }
  const itensHtml = itens.map((item) => `<li>${escapeHtml(prefixo)} ${escapeHtml(item.name)}</li>`).join('');
  return `
    <section class="detalhes-secao">
      <span class="detalhes-label">${escapeHtml(label)}</span>
      <ul class="detalhes-lista">${itensHtml}</ul>
    </section>
  `;
};

const init = () => {
  const id = getQueryParam('id');
  const beneficio = findById(MOCK_BENEFICIOS, id);

  if (!beneficio) {
    document.getElementById('header-slot').innerHTML = renderHeader({
      title: 'Benefício',
      backHref: '/src/pages/colaborador/beneficios/lista.html'
    });
    document.getElementById('main-slot').innerHTML = '<p class="lista-empty">Benefício não encontrado.</p>';
    document.getElementById('bottom-slot').innerHTML = renderBottomNav('beneficios');
    return;
  }

  document.getElementById('header-slot').innerHTML = renderHeader({
    title: beneficio.name,
    backHref: '/src/pages/colaborador/beneficios/lista.html'
  });

  const badge = BADGE_VARIANT[beneficio.status] ?? BADGE_VARIANT.ativo;
  const reqs = beneficio.requirements.map((reqId) => findById(MOCK_REQUISITOS, reqId)).filter(Boolean);
  const docs = beneficio.documents.map((docId) => findById(MOCK_DOCUMENTOS, docId)).filter(Boolean);

  const topRow = `
    <div class="detalhes-top-row">
      ${renderBadge({ children: badge.label, variant: badge.variant })}
      <a class="btn-link detalhes-edit-link" href="/src/pages/colaborador/beneficios/editar.html?id=${encodeURIComponent(beneficio.id)}">Editar &rarr;</a>
    </div>
  `;

  const linkOficial = `
    <section class="detalhes-secao">
      <span class="detalhes-label">Link oficial</span>
      <a class="detalhes-link-externo" href="${escapeHtml(beneficio.officialLink)}" target="_blank" rel="noreferrer">${escapeHtml(beneficio.officialLink)}</a>
    </section>
  `;

  const cadastro = `
    <section class="detalhes-secao">
      <span class="detalhes-label">Cadastro</span>
      <span class="detalhes-valor">${beneficio.eligibleCount.toLocaleString('pt-BR')} cidadãos elegíveis</span>
      <span class="detalhes-meta">Ultima atualizacao: ${escapeHtml(beneficio.updatedAt)}</span>
    </section>
  `;

  document.getElementById('main-slot').innerHTML = `
    <div class="detalhes-shell">
      ${topRow}
      ${renderSecao('Órgão responsável', beneficio.agency)}
      ${renderDivider()}
      ${renderSecao('Descrição', beneficio.description)}
      ${renderDivider()}
      ${renderListaSecao('Requisitos de elegibilidade', reqs, '✓')}
      ${renderDivider()}
      ${renderListaSecao('Documentos necessarios', docs, '•')}
      ${renderDivider()}
      ${linkOficial}
      ${renderDivider()}
      ${cadastro}
    </div>
  `;

  document.getElementById('bottom-slot').innerHTML = renderBottomNav('beneficios');
};

document.addEventListener('DOMContentLoaded', init);
