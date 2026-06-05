import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/mocks/unidades.js', 'utf-8'));
});

describe('MOCK_UNIDADES', () => {
  it('expoe array com 5 items', () => {
    expect(MOCK_UNIDADES).toHaveLength(5);
  });

  it('cada item tem campos esperados', () => {
    MOCK_UNIDADES.forEach((item) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('type');
      expect(item).toHaveProperty('address');
      expect(item).toHaveProperty('cep');
      expect(item).toHaveProperty('phone');
      expect(item).toHaveProperty('schedule');
      expect(item).toHaveProperty('status');
    });
  });
});

describe('MOCK_UNIDADE_TYPES', () => {
  it('expoe array com 6 tipos', () => {
    expect(MOCK_UNIDADE_TYPES).toHaveLength(6);
  });
});
