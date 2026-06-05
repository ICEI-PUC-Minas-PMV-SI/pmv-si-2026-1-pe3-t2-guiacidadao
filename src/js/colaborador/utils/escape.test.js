import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  const source = readFileSync('src/js/colaborador/utils/escape.js', 'utf-8');
  globalThis.eval(source);
});

describe('escapeHtml', () => {
  it('converte caracteres HTML perigosos', () => {
    expect(escapeHtml('<script>')).toBe('&lt;script&gt;');
    expect(escapeHtml('a & b')).toBe('a &amp; b');
    expect(escapeHtml('"aspas"')).toBe('&quot;aspas&quot;');
    expect(escapeHtml("'simples'")).toBe('&#39;simples&#39;');
  });

  it('retorna string vazia para null ou undefined', () => {
    expect(escapeHtml(null)).toBe('');
    expect(escapeHtml(undefined)).toBe('');
  });

  it('converte numeros para string', () => {
    expect(escapeHtml(42)).toBe('42');
    expect(escapeHtml(0)).toBe('0');
  });

  it('preserva texto sem caracteres especiais', () => {
    expect(escapeHtml('Texto normal')).toBe('Texto normal');
    expect(escapeHtml('')).toBe('');
  });

  it('escapa multiplas ocorrencias na mesma string', () => {
    expect(escapeHtml('<a><b>')).toBe('&lt;a&gt;&lt;b&gt;');
  });
});
