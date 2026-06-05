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

  renderBotoesCompartilhar({
    elegiveis,
    indeterminados,
    pendencias,
    rendaPerCapita,
    familia,
    checklist,
    quizRespondidos,
    quizTotal: naoRenda.length,
  });
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

const PT_PARA_MM = 0.3528;
const COR_PRIMARIA = [74, 110, 141];

const rotuloStatusDoc = (status) => {
  if (status === 'obtido') return 'obtido';
  if (status === 'nao-aplicavel') return 'não se aplica';
  return 'pendente';
};

const gerarPdf = ({ elegiveis, indeterminados, pendencias, rendaPerCapita, familia, checklist, quizRespondidos, quizTotal }) => {
  if (!window.jspdf) {
    alert('Não foi possível gerar o PDF. Tente imprimir como PDF pelo navegador.');
    return;
  }
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF('p', 'mm', 'a4');
  const larguraPag = 210;
  const alturaPag = 297;
  const margem = 16;
  const larguraUtil = larguraPag - margem * 2;
  const limiteInferior = alturaPag - margem - 6;
  let y = margem;

  const novaPagina = () => {
    pdf.addPage();
    y = margem;
  };

  const escrever = (texto, opcoes = {}) => {
    const {
      tamanho = 11,
      estilo = 'normal',
      cor = [40, 40, 40],
      recuo = 0,
      espacoDepois = 1.5,
      espacoLinha = 1.3,
    } = opcoes;
    pdf.setFont('helvetica', estilo);
    pdf.setFontSize(tamanho);
    pdf.setTextColor(cor[0], cor[1], cor[2]);
    const alturaLinha = tamanho * PT_PARA_MM * espacoLinha;
    const linhas = pdf.splitTextToSize(String(texto), larguraUtil - recuo);
    linhas.forEach((linha) => {
      if (y + alturaLinha > limiteInferior) novaPagina();
      pdf.text(linha, margem + recuo, y);
      y += alturaLinha;
    });
    y += espacoDepois;
  };

  const tituloSecao = (texto) => {
    if (y + 14 > limiteInferior) novaPagina();
    y += 3;
    pdf.setDrawColor(COR_PRIMARIA[0], COR_PRIMARIA[1], COR_PRIMARIA[2]);
    pdf.setLineWidth(0.5);
    pdf.line(margem, y, margem + larguraUtil, y);
    y += 5.5;
    escrever(texto, { tamanho: 13, estilo: 'bold', cor: COR_PRIMARIA, espacoDepois: 2.5 });
  };

  const desenharBarra = (pct) => {
    const altura = 2.4;
    if (y + altura > limiteInferior) novaPagina();
    const x = margem + 4;
    const largura = larguraUtil - 4;
    pdf.setFillColor(230, 230, 230);
    pdf.rect(x, y, largura, altura, 'F');
    if (pct > 0) {
      pdf.setFillColor(46, 125, 50);
      pdf.rect(x, y, (largura * Math.min(pct, 100)) / 100, altura, 'F');
    }
    y += altura + 3.5;
  };

  // Cabeçalho
  pdf.setFillColor(COR_PRIMARIA[0], COR_PRIMARIA[1], COR_PRIMARIA[2]);
  pdf.rect(0, 0, larguraPag, 26, 'F');
  pdf.setTextColor(255, 255, 255);
  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(18);
  pdf.text('Meus Benefícios', margem, 13);
  pdf.setFont('helvetica', 'normal');
  pdf.setFontSize(10);
  pdf.text('GuiaCidadão', margem, 20);
  const data = new Date();
  const dataStr = data.toLocaleDateString('pt-BR');
  pdf.text(`Gerado em ${dataStr}`, larguraPag - margem, 20, { align: 'right' });
  y = 36;

  // Resumo da família
  tituloSecao('Resumo da família');
  escrever(`Membros da família: ${familia.membros?.length ?? 0}`);
  escrever(`Renda per capita: ${rendaPerCapita !== null ? formatarMoeda(rendaPerCapita) : 'não calculada (cadastre os membros)'}`);
  escrever(`Quiz de elegibilidade: ${quizRespondidos} de ${quizTotal} perguntas respondidas`);

  // Benefícios elegíveis
  tituloSecao(`Benefícios elegíveis (${elegiveis.length})`);
  if (elegiveis.length === 0) {
    escrever('Nenhum benefício elegível com base no seu perfil atual.', { cor: [110, 110, 110] });
  } else {
    elegiveis.forEach(({ beneficio }) => {
      const bc = checklist[beneficio.id] ?? {};
      const progresso = calcularProgresso(beneficio, bc);
      escrever(beneficio.name, { tamanho: 12, estilo: 'bold', espacoDepois: 0.8 });
      escrever(`Documentos: ${progresso.obtidos} de ${progresso.aplicaveis} obtidos (${progresso.pct}%)`, {
        tamanho: 10,
        cor: [90, 90, 90],
        recuo: 4,
        espacoDepois: 1.5,
      });
      desenharBarra(progresso.pct);
      const docs = (beneficio.documents ?? [])
        .map((id) => obterColecao(STORAGE_COLECOES.documentos, id))
        .filter(Boolean);
      docs.forEach((doc) => {
        const status = bc[doc.id] ?? 'pendente';
        escrever(`- ${doc.name} (${rotuloStatusDoc(status)})`, { tamanho: 10, recuo: 6, espacoDepois: 0.5 });
      });
      y += 3;
    });
  }

  // A verificar
  tituloSecao(`A verificar (${indeterminados.length})`);
  if (indeterminados.length === 0) {
    escrever('Tudo verificado.', { cor: [110, 110, 110] });
  } else {
    indeterminados.forEach(({ beneficio, aval }) => {
      escrever(beneficio.name, { tamanho: 12, estilo: 'bold', espacoDepois: 0.8 });
      escrever(`Pendente verificar: ${(aval.motivos ?? []).join(', ')}`, {
        tamanho: 10,
        cor: [90, 90, 90],
        recuo: 4,
        espacoDepois: 3,
      });
    });
  }

  // Documentos pendentes
  tituloSecao(`Documentos pendentes (${pendencias.length})`);
  if (pendencias.length === 0) {
    escrever('Sem pendências de documentos para os benefícios elegíveis.', { cor: [110, 110, 110] });
  } else {
    pendencias.forEach((p) => {
      escrever(`- ${p.doc} (${p.beneficio})`, { tamanho: 10, espacoDepois: 0.5 });
    });
  }

  // Aviso
  y += 4;
  escrever(
    'Este documento é um resumo preliminar gerado pelo GuiaCidadão e não garante a concessão dos benefícios. Procure a unidade de atendimento para confirmar a sua elegibilidade.',
    { tamanho: 8, estilo: 'italic', cor: [130, 130, 130] },
  );

  // Rodapé com numeração
  const totalPaginas = pdf.getNumberOfPages();
  for (let i = 1; i <= totalPaginas; i += 1) {
    pdf.setPage(i);
    pdf.setFont('helvetica', 'normal');
    pdf.setFontSize(8);
    pdf.setTextColor(150, 150, 150);
    pdf.text(`GuiaCidadão | Página ${i} de ${totalPaginas}`, larguraPag / 2, alturaPag - 8, { align: 'center' });
  }

  const sufixoData = data.toISOString().slice(0, 10);
  pdf.save(`meus-beneficios-${sufixoData}.pdf`);
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

  document.getElementById('btn-pdf').addEventListener('click', () => gerarPdf(resumo));
};

document.addEventListener('DOMContentLoaded', init);
