const parseValorRequisito = (valor) => {
  const n = Number(String(valor ?? '').replace(',', '.'));
  return Number.isFinite(n) ? n : null;
};

const calcularRendaPerCapita = (familia) => {
  const membros = familia?.membros ?? [];
  if (membros.length === 0) return null;
  const total = membros.reduce((sum, m) => sum + Number(m.rendaMensal ?? 0), 0);
  return total / membros.length;
};

const comparar = (atual, operador, alvo) => {
  if (atual === null || alvo === null) return null;
  switch (operador) {
    case 'lte': return atual <= alvo;
    case 'gte': return atual >= alvo;
    case 'lt': return atual < alvo;
    case 'gt': return atual > alvo;
    case 'eq': return atual === alvo;
    default: return null;
  }
};

const avaliarRequisitoRenda = (requisito, familia) => {
  const renda = calcularRendaPerCapita(familia);
  const valor = parseValorRequisito(requisito.value);
  return comparar(renda, requisito.operator, valor);
};

const avaliarRequisito = (requisito, familia, respostasQuiz) => {
  if (!requisito) return null;
  if (requisito.category === 'renda') {
    return avaliarRequisitoRenda(requisito, familia);
  }
  const resposta = respostasQuiz?.[requisito.id];
  if (resposta === 'sim') return true;
  if (resposta === 'nao') return false;
  return null;
};

const avaliarBeneficio = (beneficio, familia, respostasQuiz, requisitos) => {
  const ids = beneficio.requirements ?? [];
  if (ids.length === 0) return { status: 'elegivel', motivos: [] };

  const avaliacoes = ids.map((reqId) => {
    const req = requisitos.find((r) => r.id === reqId);
    return { req, atende: avaliarRequisito(req, familia, respostasQuiz) };
  }).filter((a) => a.req);

  if (avaliacoes.some((a) => a.atende === false)) {
    const motivos = avaliacoes.filter((a) => a.atende === false).map((a) => a.req.name);
    return { status: 'nao-elegivel', motivos };
  }
  if (avaliacoes.some((a) => a.atende === null)) {
    const pendentes = avaliacoes.filter((a) => a.atende === null).map((a) => a.req.name);
    return { status: 'indeterminado', motivos: pendentes };
  }
  return { status: 'elegivel', motivos: [] };
};

const listarRequisitosNaoRenda = (beneficios, requisitos) => {
  const idsUsados = new Set();
  beneficios.forEach((b) => (b.requirements ?? []).forEach((id) => idsUsados.add(id)));
  return requisitos
    .filter((r) => idsUsados.has(r.id) && r.category !== 'renda')
    .filter((r, idx, arr) => arr.findIndex((x) => x.id === r.id) === idx);
};

globalThis.calcularRendaPerCapita = calcularRendaPerCapita;
globalThis.avaliarBeneficio = avaliarBeneficio;
globalThis.listarRequisitosNaoRenda = listarRequisitosNaoRenda;
