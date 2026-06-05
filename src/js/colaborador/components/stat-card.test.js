import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/utils/escape.js', 'utf-8'));
  globalThis.eval(readFileSync('src/js/colaborador/components/stat-card.js', 'utf-8'));
});

describe('renderStatCard', () => {
  it('renderiza como a (link) quando href fornecido', () => {
    const html = renderStatCard({ value: '12', label: 'Beneficios', href: '/beneficios' });
    expect(html).toContain('<a class="stat-card"');
    expect(html).toContain('href="/beneficios"');
    expect(html).toContain('class="stat-card-value"');
    expect(html).toContain('>12<');
    expect(html).toContain('class="stat-card-label"');
    expect(html).toContain('>Beneficios<');
  });

  it('renderiza como button quando href ausente', () => {
    const html = renderStatCard({ value: '5', label: 'X', id: 'stat-1' });
    expect(html).toContain('class="stat-card"');
    expect(html).toContain('id="stat-1"');
    expect(html).toContain('type="button"');
    expect(html).not.toContain('<a class="stat-card"');
  });

  it('renderiza hint quando fornecido', () => {
    const html = renderStatCard({ value: '1', label: 'X', hint: 'hoje' });
    expect(html).toContain('class="stat-card-hint"');
    expect(html).toContain('>hoje<');
  });

  it('escapa value, label, hint, href, id', () => {
    const html = renderStatCard({ value: '<v>', label: '<l>', hint: '<h>', href: '<x>' });
    expect(html).toContain('&lt;v&gt;');
    expect(html).toContain('&lt;l&gt;');
    expect(html).toContain('&lt;h&gt;');
    expect(html).toContain('href="&lt;x&gt;"');
  });
});
