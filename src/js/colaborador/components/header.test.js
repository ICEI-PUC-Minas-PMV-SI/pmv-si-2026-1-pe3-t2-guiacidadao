import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/utils/escape.js', 'utf-8'));
  globalThis.eval(readFileSync('src/js/colaborador/components/header.js', 'utf-8'));
});

describe('renderHeader modo padrao', () => {
  it('renderiza header bar com title e back btn', () => {
    const html = renderHeader({ title: 'Beneficios', backHref: '/painel' });
    expect(html).toContain('<header class="app-header">');
    expect(html).toContain('class="back-btn"');
    expect(html).toContain('href="/painel"');
    expect(html).toContain('aria-label="Voltar"');
    expect(html).toContain('class="header-title"');
    expect(html).toContain('>Beneficios<');
  });

  it('renderiza subtitle quando fornecido', () => {
    const html = renderHeader({ title: 'X', subtitle: 'Sub' });
    expect(html).toContain('class="header-subtitle"');
    expect(html).toContain('>Sub<');
  });

  it('omite back btn quando backHref ausente', () => {
    const html = renderHeader({ title: 'X' });
    expect(html).not.toContain('back-btn');
  });
});

describe('renderHeader modo hero', () => {
  it('renderiza brand e subtitle no hero', () => {
    const html = renderHeader({ hero: true, brand: 'GuiaCidadao', subtitle: 'Painel' });
    expect(html).toContain('class="app-header-hero"');
    expect(html).toContain('>GuiaCidadao<');
    expect(html).toContain('>Painel<');
    expect(html).not.toContain('back-btn');
  });

  it('renderiza initials quando fornecido', () => {
    const html = renderHeader({ hero: true, brand: 'X', initials: 'LC' });
    expect(html).toContain('class="header-hero-avatar"');
    expect(html).toContain('>LC<');
  });

  it('usa brand padrao GuiaCidadao', () => {
    const html = renderHeader({ hero: true });
    expect(html).toContain('>GuiaCidadao<');
  });

  it('escapa todos os campos do hero', () => {
    const html = renderHeader({ hero: true, brand: '<a>', subtitle: '<b>', initials: '<c>' });
    expect(html).toContain('&lt;a&gt;');
    expect(html).toContain('&lt;b&gt;');
    expect(html).toContain('&lt;c&gt;');
  });
});
