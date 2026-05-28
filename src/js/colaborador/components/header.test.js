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

  it('inclui logo image no header bar', () => {
    const html = renderHeader({ title: 'X', backHref: '/x' });
    expect(html).toContain('class="header-logo-img"');
    expect(html).toContain('src="/src/assets/icons/Logo.png"');
    expect(html).toContain('alt="GuiaCidadao"');
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

  it('escapa title e subtitle', () => {
    const html = renderHeader({ title: '<t>', subtitle: '<s>' });
    expect(html).toContain('&lt;t&gt;');
    expect(html).toContain('&lt;s&gt;');
  });
});

describe('renderHeader modo hero', () => {
  it('renderiza app-header-hero', () => {
    const html = renderHeader({ hero: true, subtitle: 'Painel' });
    expect(html).toContain('class="app-header-hero"');
    expect(html).toContain('>Painel<');
    expect(html).not.toContain('back-btn');
  });

  it('inclui logo image no hero', () => {
    const html = renderHeader({ hero: true });
    expect(html).toContain('class="header-logo-img"');
    expect(html).toContain('src="/src/assets/icons/Logo.png"');
    expect(html).toContain('alt="GuiaCidadao"');
  });

  it('renderiza initials quando fornecido', () => {
    const html = renderHeader({ hero: true, initials: 'LC' });
    expect(html).toContain('class="header-hero-avatar"');
    expect(html).toContain('>LC<');
  });

  it('escapa subtitle e initials do hero', () => {
    const html = renderHeader({ hero: true, subtitle: '<b>', initials: '<c>' });
    expect(html).toContain('&lt;b&gt;');
    expect(html).toContain('&lt;c&gt;');
  });
});
