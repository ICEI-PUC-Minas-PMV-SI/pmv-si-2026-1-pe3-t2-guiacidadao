import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/utils/escape.js', 'utf-8'));
  globalThis.eval(readFileSync('src/js/colaborador/shared/status-circle.js', 'utf-8'));
});

describe('renderStatusCircle', () => {
  it('renderiza warning por padrao com glifo !', () => {
    const html = renderStatusCircle({});
    expect(html).toContain('class="status-circle status-circle--warning"');
    expect(html).toContain('>!');
  });

  it('aceita danger com glifo !', () => {
    const html = renderStatusCircle({ variant: 'danger' });
    expect(html).toContain('status-circle--danger');
    expect(html).toContain('>!');
  });

  it('aceita success com glifo check', () => {
    const html = renderStatusCircle({ variant: 'success' });
    expect(html).toContain('status-circle--success');
    expect(html).toContain('&check;');
  });

  it('fallback para warning em variant invalido', () => {
    const html = renderStatusCircle({ variant: 'foo' });
    expect(html).toContain('status-circle--warning');
  });
});
