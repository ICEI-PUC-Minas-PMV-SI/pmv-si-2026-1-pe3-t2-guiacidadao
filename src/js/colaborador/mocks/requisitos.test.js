import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/mocks/requisitos.js', 'utf-8'));
});

describe('MOCK_REQUISITOS', () => {
  it('expoe array com 5 items', () => {
    expect(MOCK_REQUISITOS).toHaveLength(5);
  });

  it('cada item tem id e name', () => {
    MOCK_REQUISITOS.forEach((item) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('category');
    });
  });
});

describe('MOCK_REQUISITO_CATEGORIES', () => {
  it('expoe array com 5 categorias', () => {
    expect(MOCK_REQUISITO_CATEGORIES).toHaveLength(5);
  });

  it('cada categoria tem value e label', () => {
    MOCK_REQUISITO_CATEGORIES.forEach((cat) => {
      expect(cat).toHaveProperty('value');
      expect(cat).toHaveProperty('label');
    });
  });
});

describe('MOCK_OPERADORES', () => {
  it('expoe array com 5 operadores', () => {
    expect(MOCK_OPERADORES).toHaveLength(5);
  });

  it('cada operador tem value e label', () => {
    MOCK_OPERADORES.forEach((op) => {
      expect(op).toHaveProperty('value');
      expect(op).toHaveProperty('label');
    });
  });
});
