const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CURRENCY_FORMATTER = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

const isValidEmail = (value) => {
  if (!value) return false;
  return EMAIL_REGEX.test(value);
};

const calcularDigitoVerificador = (digits, multiplicadorInicial) => {
  const sum = digits.reduce((acc, digit, index) => {
    return acc + digit * (multiplicadorInicial - index);
  }, 0);
  const resto = (sum * 10) % 11;
  return resto === 10 ? 0 : resto;
};

const isValidCpf = (value) => {
  if (!value) return false;
  const digits = String(value).replace(/\D/g, '');
  if (digits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false;

  const numbers = digits.split('').map(Number);
  const dv1 = calcularDigitoVerificador(numbers.slice(0, 9), 10);
  if (dv1 !== numbers[9]) return false;
  const dv2 = calcularDigitoVerificador(numbers.slice(0, 10), 11);
  return dv2 === numbers[10];
};

const maskCpf = (value) => {
  if (!value) return '';
  const digits = String(value).replace(/\D/g, '');
  if (digits.length !== 11) return String(value);
  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`;
};

const parseCurrency = (value) => {
  if (value === null || value === undefined || value === '') return NaN;
  const normalized = String(value).replace(',', '.');
  return parseFloat(normalized);
};

const formatCurrency = (value) => CURRENCY_FORMATTER.format(value);

globalThis.isValidEmail = isValidEmail;
globalThis.isValidCpf = isValidCpf;
globalThis.maskCpf = maskCpf;
globalThis.parseCurrency = parseCurrency;
globalThis.formatCurrency = formatCurrency;
