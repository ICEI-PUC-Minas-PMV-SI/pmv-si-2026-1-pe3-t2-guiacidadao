import { describe, it, expect } from 'vitest';

describe('infra de testes', () => {
  it('vitest roda', () => {
    expect(1 + 1).toBe(2);
  });

  it('happy-dom expoe document', () => {
    expect(typeof document).toBe('object');
    expect(typeof document.createElement).toBe('function');
  });
});
