import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/utils/escape.js', 'utf-8'));
  globalThis.eval(readFileSync('src/js/colaborador/components/filter-pill.js', 'utf-8'));
});

describe('renderFilterPill', () => {
  it('renderiza button com classe filter-pill', () => {
    const html = renderFilterPill({ label: 'Todos' });
    expect(html).toContain('<button');
    expect(html).toContain('class="filter-pill"');
    expect(html).toContain('>Todos');
  });

  it('aplica classe active quando active=true', () => {
    const html = renderFilterPill({ label: 'X', active: true });
    expect(html).toContain('class="filter-pill filter-pill--active"');
  });

  it('renderiza count quando number', () => {
    const html = renderFilterPill({ label: 'Ativos', count: 5 });
    expect(html).toContain('Ativos &middot; 5');
  });

  it('omite count quando ausente ou nao numero', () => {
    expect(renderFilterPill({ label: 'X' })).not.toContain('&middot;');
    expect(renderFilterPill({ label: 'X', count: 'abc' })).not.toContain('&middot;');
  });

  it('aplica id', () => {
    const html = renderFilterPill({ label: 'X', id: 'pill-1' });
    expect(html).toContain('id="pill-1"');
  });

  it('escapa label e id', () => {
    const html = renderFilterPill({ label: '<x>', id: '<y>' });
    expect(html).toContain('&lt;x&gt;');
    expect(html).toContain('id="&lt;y&gt;"');
  });
});
