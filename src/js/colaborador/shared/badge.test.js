import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/utils/escape.js', 'utf-8'));
  globalThis.eval(readFileSync('src/js/colaborador/shared/badge.js', 'utf-8'));
});

describe('renderBadge', () => {
  it('usa variant success por padrao', () => {
    const html = renderBadge({ children: 'Ativo' });
    expect(html).toContain('class="badge badge-success"');
    expect(html).toContain('>Ativo<');
  });

  it('aceita warning, info, danger', () => {
    expect(renderBadge({ children: 'X', variant: 'warning' })).toContain('badge-warning');
    expect(renderBadge({ children: 'X', variant: 'info' })).toContain('badge-info');
    expect(renderBadge({ children: 'X', variant: 'danger' })).toContain('badge-danger');
  });

  it('escapa children', () => {
    const html = renderBadge({ children: '<x>' });
    expect(html).toContain('&lt;x&gt;');
  });
});
