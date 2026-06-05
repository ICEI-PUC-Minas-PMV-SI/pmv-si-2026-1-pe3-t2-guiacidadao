import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/mocks/beneficios.js', 'utf-8'));
});

describe('MOCK_BENEFICIOS', () => {
  it('expoe array com 6 items', () => {
    expect(MOCK_BENEFICIOS).toHaveLength(6);
  });

  it('cada item tem campos esperados', () => {
    MOCK_BENEFICIOS.forEach((item) => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('agency');
      expect(item).toHaveProperty('description');
      expect(item).toHaveProperty('requirements');
      expect(item).toHaveProperty('documents');
      expect(item).toHaveProperty('officialLink');
      expect(item).toHaveProperty('status');
      expect(item).toHaveProperty('eligibleCount');
      expect(item).toHaveProperty('updatedAt');
    });
  });
});

describe('MOCK_BENEFICIO_STATUS_OPTIONS', () => {
  it('expoe 4 opcoes de filtro', () => {
    expect(MOCK_BENEFICIO_STATUS_OPTIONS).toHaveLength(4);
    expect(MOCK_BENEFICIO_STATUS_OPTIONS[0].value).toBe('todos');
  });
});
