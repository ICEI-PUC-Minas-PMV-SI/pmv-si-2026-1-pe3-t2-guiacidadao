const limparCpf = (cpf) => String(cpf ?? '').replace(/\D/g, '');

const formatarCpf = (cpf) => {
  const limpo = limparCpf(cpf);
  if (limpo.length !== 11) return cpf;
  return `${limpo.slice(0, 3)}.${limpo.slice(3, 6)}.${limpo.slice(6, 9)}-${limpo.slice(9)}`;
};

const cpfTodosIguais = (cpf) => /^(\d)\1+$/.test(cpf);

const calcularDigito = (cpfParcial, pesoInicial) => {
  let soma = 0;
  for (let i = 0; i < cpfParcial.length; i++) {
    soma += Number(cpfParcial[i]) * (pesoInicial - i);
  }
  const resto = (soma * 10) % 11;
  return resto === 10 ? 0 : resto;
};

const validarCpf = (cpf) => {
  const limpo = limparCpf(cpf);
  if (limpo.length !== 11) return false;
  if (cpfTodosIguais(limpo)) return false;
  const d1 = calcularDigito(limpo.slice(0, 9), 10);
  if (d1 !== Number(limpo[9])) return false;
  const d2 = calcularDigito(limpo.slice(0, 10), 11);
  return d2 === Number(limpo[10]);
};

const aplicarMascaraCpf = (input) => {
  input.addEventListener('input', () => {
    const v = limparCpf(input.value).slice(0, 11);
    if (v.length <= 3) input.value = v;
    else if (v.length <= 6) input.value = `${v.slice(0, 3)}.${v.slice(3)}`;
    else if (v.length <= 9) input.value = `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6)}`;
    else input.value = `${v.slice(0, 3)}.${v.slice(3, 6)}.${v.slice(6, 9)}-${v.slice(9)}`;
  });
};

globalThis.validarCpf = validarCpf;
globalThis.formatarCpf = formatarCpf;
globalThis.limparCpf = limparCpf;
globalThis.aplicarMascaraCpf = aplicarMascaraCpf;
