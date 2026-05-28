import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/utils/escape.js', 'utf-8'));
  globalThis.eval(readFileSync('src/js/colaborador/components/list-item.js', 'utf-8'));
});

describe('renderListItem', () => {
  it('renderiza como link quando href fornecido', () => {
    const html = renderListItem({ title: 'Bolsa Familia', href: '/beneficios/1' });
    expect(html).toContain('<a class="list-item"');
    expect(html).toContain('href="/beneficios/1"');
    expect(html).toContain('class="list-item-title"');
    expect(html).toContain('>Bolsa Familia<');
    expect(html).toContain('class="list-item-chevron"');
  });

  it('renderiza como button quando href ausente', () => {
    const html = renderListItem({ title: 'X', id: 'li-1' });
    expect(html).toContain('class="list-item"');
    expect(html).toContain('id="li-1"');
    expect(html).toContain('type="button"');
    expect(html).not.toContain('<a class="list-item"');
  });

  it('renderiza subtitle quando fornecido', () => {
    const html = renderListItem({ title: 'X', subtitle: 'Auxilio mensal' });
    expect(html).toContain('class="list-item-subtitle"');
    expect(html).toContain('>Auxilio mensal<');
  });

  it('injeta badgeHtml sem escapar', () => {
    const html = renderListItem({ title: 'X', badgeHtml: '<span class="badge">Ativo</span>' });
    expect(html).toContain('<span class="badge">Ativo</span>');
  });

  it('escapa title, subtitle e href', () => {
    const html = renderListItem({ title: '<t>', subtitle: '<s>', href: '<h>' });
    expect(html).toContain('&lt;t&gt;');
    expect(html).toContain('&lt;s&gt;');
    expect(html).toContain('href="&lt;h&gt;"');
  });
});
