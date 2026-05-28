import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/shared/divider.js', 'utf-8'));
});

describe('renderDivider', () => {
  it('retorna div com classe divider', () => {
    expect(renderDivider()).toBe('<div class="divider"></div>');
  });
});
