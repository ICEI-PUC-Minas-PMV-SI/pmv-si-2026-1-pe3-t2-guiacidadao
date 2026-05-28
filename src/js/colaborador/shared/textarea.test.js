import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/utils/escape.js', 'utf-8'));
  globalThis.eval(readFileSync('src/js/colaborador/shared/textarea.js', 'utf-8'));
});

describe('renderTextArea', () => {
  it('renderiza form-group com label e textarea', () => {
    const html = renderTextArea({ label: 'Descricao' });
    expect(html).toContain('class="form-group"');
    expect(html).toContain('>Descricao<');
    expect(html).toContain('<textarea');
    expect(html).toContain('class="form-input form-textarea"');
  });

  it('marca asterisco quando required', () => {
    const html = renderTextArea({ label: 'X', required: true });
    expect(html).toContain('X *');
  });

  it('usa rows=4 por padrao', () => {
    const html = renderTextArea({ label: 'X' });
    expect(html).toContain('rows="4"');
  });

  it('aceita rows personalizado', () => {
    const html = renderTextArea({ label: 'X', rows: 8 });
    expect(html).toContain('rows="8"');
  });

  it('aplica value entre tags textarea', () => {
    const html = renderTextArea({ label: 'X', value: 'Texto inicial' });
    expect(html).toMatch(/<textarea[^>]*>Texto inicial<\/textarea>/);
  });

  it('aplica placeholder', () => {
    const html = renderTextArea({ label: 'X', placeholder: 'Digite...' });
    expect(html).toContain('placeholder="Digite..."');
  });

  it('escapa valores', () => {
    const html = renderTextArea({ label: '<x>', value: '<script>', placeholder: '<y>' });
    expect(html).toContain('&lt;x&gt;');
    expect(html).toContain('&lt;script&gt;');
    expect(html).toContain('placeholder="&lt;y&gt;"');
    expect(html).not.toContain('<script>');
  });
});
