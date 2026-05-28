import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/utils/escape.js', 'utf-8'));
  globalThis.eval(readFileSync('src/js/colaborador/components/menu-item.js', 'utf-8'));
});

describe('renderMenuItem', () => {
  it('renderiza como link quando href fornecido', () => {
    const html = renderMenuItem({ iconHtml: '<svg/>', title: 'Beneficios', href: '/b' });
    expect(html).toContain('<a class="menu-item"');
    expect(html).toContain('class="menu-item-icon"');
    expect(html).toContain('<svg/>');
    expect(html).toContain('class="menu-item-title"');
    expect(html).toContain('>Beneficios<');
    expect(html).toContain('class="menu-item-chevron"');
  });

  it('renderiza como button quando href ausente', () => {
    const html = renderMenuItem({ iconHtml: '', title: 'X', id: 'm1' });
    expect(html).toContain('class="menu-item"');
    expect(html).toContain('id="m1"');
    expect(html).toContain('type="button"');
    expect(html).not.toContain('<a class="menu-item"');
  });

  it('renderiza subtitle quando fornecido', () => {
    const html = renderMenuItem({ iconHtml: '', title: 'X', subtitle: 'desc' });
    expect(html).toContain('class="menu-item-subtitle"');
    expect(html).toContain('>desc<');
  });

  it('iconHtml e injetado sem escapar', () => {
    const html = renderMenuItem({ iconHtml: '<svg><path/></svg>', title: 'X' });
    expect(html).toContain('<svg><path/></svg>');
  });

  it('escapa title, subtitle, href, id', () => {
    const html = renderMenuItem({ iconHtml: '', title: '<t>', subtitle: '<s>', href: '<h>' });
    expect(html).toContain('&lt;t&gt;');
    expect(html).toContain('&lt;s&gt;');
    expect(html).toContain('href="&lt;h&gt;"');
  });
});
