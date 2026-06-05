const escapeHtmlText = (texto) => String(texto ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const formatarMoeda = (valor) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

const calcularProgresso = (beneficio, beneficioChecklist) => {
  const total = (beneficio.documents ?? []).length;
  if (total === 0) return { obtidos: 0, aplicaveis: 0, pct: 100 };
  const obtidos = beneficio.documents.filter((id) => beneficioChecklist[id] === 'obtido').length;
  const naoAplicavel = beneficio.documents.filter((id) => beneficioChecklist[id] === 'nao-aplicavel').length;
  const aplicaveis = total - naoAplicavel;
  const pct = aplicaveis === 0 ? 100 : Math.round((obtidos / aplicaveis) * 100);
  return { obtidos, aplicaveis, pct };
};

const renderCardBeneficio = (beneficio, checklist) => {
  const progresso = calcularProgresso(beneficio, checklist[beneficio.id] ?? {});
  const cor = beneficio.cor || '#D9EEFF';
  const href = `/src/pages/benefits/beneficio.html?id=${encodeURIComponent(beneficio.id)}`;
  return `
    <div class="benefit-card card-blue" style="margin-bottom: 12px; border-left: 6px solid ${escapeHtmlText(cor)};">
      <h3>${escapeHtmlText(beneficio.name)}</h3>
      <p style="font-size: 13px; margin: 6px 0;">${progresso.obtidos} de ${progresso.aplicaveis} documentos obtidos (${progresso.pct}%)</p>
      <div style="width: 100%; height: 8px; background: #eee; border-radius: 999px; overflow: hidden; margin: 8px 0 12px;">
        <div style="width: ${progresso.pct}%; height: 100%; background: #2e7d32;"></div>
      </div>
      <a href="${href}" style="color: var(--primary); text-decoration: none; font-weight: 600;">Abrir benefício &rsaquo;</a>
    </div>
  `;
};

const renderCardIndeterminado = (beneficio, motivos) => {
  const cor = beneficio.cor || '#D9EEFF';
  const href = `/src/pages/benefits/beneficio.html?id=${encodeURIComponent(beneficio.id)}`;
  return `
    <div class="benefit-card card-blue" style="margin-bottom: 12px; border-left: 6px solid ${escapeHtmlText(cor)};">
      <h3>${escapeHtmlText(beneficio.name)}</h3>
      <p style="font-size: 13px; color: var(--text-muted); margin: 6px 0;">Pendente verificar: ${motivos.map(escapeHtmlText).join(', ')}</p>
      <a href="${href}" style="color: var(--primary); text-decoration: none; font-weight: 600;">Detalhes &rsaquo;</a>
    </div>
  `;
};

const renderEstadoVazio = (mensagem) => `<p style="font-size: 13px; color: var(--text-muted); padding: 12px 0;">${escapeHtmlText(mensagem)}</p>`;

const init = () => {
  const userId = obterUsuarioLogadoId();
  const conteudo = document.getElementById('dashboard-resumo');
  const cta = document.getElementById('dashboard-cta');

  if (!userId) {
    conteudo.innerHTML = `
      <div class="benefit-card card-blue">
        <h2>Faça login para acompanhar</h2>
        <p>Você precisa estar logado para ver sua elegibilidade e progresso.</p>
        <a href="/src/pages/login/login.html" class="btn btn-primary" style="margin-top: 12px; display: inline-block;">Fazer login</a>
      </div>
    `;
    document.getElementById('dashboard-elegiveis').innerHTML = '';
    document.getElementById('dashboard-indeterminados').innerHTML = '';
    document.getElementById('dashboard-pendencias').innerHTML = '';
    return;
  }

  const familia = obterFamiliaUsuario(userId);
  const beneficios = listarColecao(STORAGE_COLECOES.beneficios).filter((b) => b.status === 'ativo');
  const requisitos = listarColecao(STORAGE_COLECOES.requisitos);
  const quiz = obterQuizUsuario(userId);
  const checklist = obterChecklistUsuario(userId);
  const naoRenda = listarRequisitosNaoRenda(beneficios, requisitos);
  const quizRespondidos = naoRenda.filter((r) => quiz[r.id]).length;

  const rendaPerCapita = calcularRendaPerCapita(familia);
  conteudo.innerHTML = `
    <div class="benefit-card card-blue">
      <h2>Resumo</h2>
      <p><strong>Membros da família:</strong> ${familia.membros?.length ?? 0}</p>
      <p><strong>Renda per capita:</strong> ${rendaPerCapita !== null ? formatarMoeda(rendaPerCapita) : 'Cadastre membros'}</p>
      <p><strong>Quiz respondido:</strong> ${quizRespondidos} de ${naoRenda.length} perguntas</p>
    </div>
  `;

  const linkBtn = 'display: flex; align-items: center; justify-content: center; text-decoration: none; padding: 0 16px;';
  const acoes = [];
  if (naoRenda.length > 0 && quizRespondidos < naoRenda.length) {
    acoes.push(`<a href="/src/pages/quiz/quiz.html" class="btn btn-primary" style="${linkBtn}">Responder quiz de elegibilidade</a>`);
  }
  acoes.push(`<a href="/src/pages/simulacao/simulacao.html" class="btn btn-outline" style="${linkBtn}">Simular mudanças na renda</a>`);
  cta.innerHTML = `<div style="display: flex; flex-direction: column; gap: 8px;">${acoes.join('')}</div>`;

  const avaliacoes = beneficios.map((b) => ({ beneficio: b, aval: avaliarBeneficio(b, familia, quiz, requisitos) }));
  const elegiveis = avaliacoes.filter((x) => x.aval.status === 'elegivel');
  const indeterminados = avaliacoes.filter((x) => x.aval.status === 'indeterminado');

  document.getElementById('dashboard-elegiveis').innerHTML = elegiveis.length === 0
    ? renderEstadoVazio('Nenhum benefício elegível com base no seu perfil atual.')
    : elegiveis.map(({ beneficio }) => renderCardBeneficio(beneficio, checklist)).join('');

  document.getElementById('dashboard-indeterminados').innerHTML = indeterminados.length === 0
    ? renderEstadoVazio('Tudo verificado.')
    : indeterminados.map(({ beneficio, aval }) => renderCardIndeterminado(beneficio, aval.motivos)).join('');

  const pendencias = [];
  elegiveis.forEach(({ beneficio }) => {
    const docs = (beneficio.documents ?? [])
      .map((id) => obterColecao(STORAGE_COLECOES.documentos, id))
      .filter(Boolean);
    docs.forEach((doc) => {
      const status = (checklist[beneficio.id] ?? {})[doc.id] ?? 'pendente';
      if (status === 'pendente') {
        pendencias.push({ beneficio: beneficio.name, doc: doc.name });
      }
    });
  });

  document.getElementById('dashboard-pendencias').innerHTML = pendencias.length === 0
    ? renderEstadoVazio('Sem pendências de documentos para os benefícios elegíveis.')
    : pendencias.map((p) => `<p style="font-size: 13px; margin: 4px 0;">- ${escapeHtmlText(p.doc)} <span style="color: var(--text-muted);">(${escapeHtmlText(p.beneficio)})</span></p>`).join('');

  renderBotoesCompartilhar({ elegiveis, indeterminados, pendencias, rendaPerCapita, familia });
};

const gerarResumoTexto = ({ elegiveis, indeterminados, pendencias, rendaPerCapita, familia }) => {
  const linhas = ['Meus Benefícios - GuiaCidadão', ''];
  linhas.push(`Renda per capita: ${rendaPerCapita !== null ? formatarMoeda(rendaPerCapita) : 'sem cálculo'}`);
  linhas.push(`Membros da família: ${familia.membros?.length ?? 0}`);
  linhas.push('');
  linhas.push(`Elegíveis (${elegiveis.length}):`);
  elegiveis.forEach(({ beneficio }) => linhas.push(`- ${beneficio.name}`));
  if (indeterminados.length > 0) {
    linhas.push('');
    linhas.push(`A verificar (${indeterminados.length}):`);
    indeterminados.forEach(({ beneficio }) => linhas.push(`- ${beneficio.name}`));
  }
  if (pendencias.length > 0) {
    linhas.push('');
    linhas.push(`Documentos pendentes (${pendencias.length}):`);
    pendencias.forEach((p) => linhas.push(`- ${p.doc} (${p.beneficio})`));
  }
  return linhas.join('\n');
};

const renderBotoesCompartilhar = (resumo) => {
  const container = document.getElementById('dashboard-compartilhar');
  if (!container) return;
  container.innerHTML = `
    <button id="btn-print" class="btn btn-outline">Imprimir</button>
    <button id="btn-pdf" class="btn btn-outline">Baixar PDF</button>
    <button id="btn-whatsapp" class="btn btn-primary">Compartilhar no WhatsApp</button>
  `;

  document.getElementById('btn-print').addEventListener('click', () => window.print());

  document.getElementById('btn-whatsapp').addEventListener('click', () => {
    const texto = gerarResumoTexto(resumo);
    const url = `https://wa.me/?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank', 'noopener');
  });

  document.getElementById('btn-pdf').addEventListener('click', async () => {
    const alvo = document.getElementById('dashboard-printable');
    if (!alvo || typeof html2canvas !== 'function' || !window.jspdf) {
      alert('Não foi possível gerar o PDF. Tente imprimir como PDF pelo navegador.');
      return;
    }
    const canvas = await html2canvas(alvo, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const larguraPdf = 210;
    const alturaPdf = (canvas.height * larguraPdf) / canvas.width;
    pdf.addImage(imgData, 'PNG', 0, 0, larguraPdf, alturaPdf);
    pdf.save('meus-beneficios.pdf');
  });
};

document.addEventListener('DOMContentLoaded', init);
