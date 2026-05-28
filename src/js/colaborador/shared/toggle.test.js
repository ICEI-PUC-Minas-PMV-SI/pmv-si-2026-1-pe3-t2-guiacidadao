import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/utils/escape.js', 'utf-8'));
  globalThis.eval(readFileSync('src/js/colaborador/shared/toggle.js', 'utf-8'));
});

describe('renderToggle', () => {
  it('renderiza button com role switch', () => {
    const html = renderToggle({ id: 't1' });
    expect(html).toContain('<button');
    expect(html).toContain('role="switch"');
    expect(html).toContain('type="button"');
    expect(html).toContain('id="t1"');
  });

  it('marca aria-checked false por padrao', () => {
    const html = renderToggle({ id: 't1' });
    expect(html).toContain('aria-checked="false"');
    expect(html).toContain('class="toggle"');
  });

  it('marca aria-checked true e classe active quando active=true', () => {
    const html = renderToggle({ id: 't1', active: true });
    expect(html).toContain('aria-checked="true"');
    expect(html).toContain('class="toggle toggle--active"');
  });

  it('aplica aria-label quando fornecido', () => {
    const html = renderToggle({ id: 't1', ariaLabel: 'Ativar notificacoes' });
    expect(html).toContain('aria-label="Ativar notificacoes"');
  });

  it('escapa id e aria-label', () => {
    const html = renderToggle({ id: '<x>', ariaLabel: '<y>' });
    expect(html).toContain('id="&lt;x&gt;"');
    expect(html).toContain('aria-label="&lt;y&gt;"');
  });
});
