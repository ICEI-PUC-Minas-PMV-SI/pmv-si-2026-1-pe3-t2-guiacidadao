import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';

beforeAll(() => {
  globalThis.eval(readFileSync('src/js/colaborador/utils/escape.js', 'utf-8'));
  globalThis.eval(readFileSync('src/js/colaborador/shared/chip.js', 'utf-8'));
  globalThis.eval(readFileSync('src/js/colaborador/components/chip-list.js', 'utf-8'));
});

describe('renderChipList', () => {
  it('renderiza section com label e container', () => {
    const html = renderChipList({ label: 'Requisitos', items: [{ id: '1', label: 'CPF' }] });
    expect(html).toContain('class="chip-list"');
    expect(html).toContain('class="chip-list-label"');
    expect(html).toContain('>Requisitos<');
    expect(html).toContain('class="chip-list-items"');
  });

  it('renderiza asterisco quando required', () => {
    const html = renderChipList({ label: 'X', required: true, items: [] });
    expect(html).toContain('X *');
  });

  it('renderiza cada item como chip', () => {
    const items = [{ id: 'a', label: 'CPF' }, { id: 'b', label: 'RG' }];
    const html = renderChipList({ label: 'X', items });
    expect(html).toContain('>CPF');
    expect(html).toContain('>RG');
  });

  it('renderiza chip de adicao quando addLabel fornecido', () => {
    const html = renderChipList({ label: 'X', items: [], addLabel: '+ Adicionar', addId: 'add-r' });
    expect(html).toContain('chip-list-add');
    expect(html).toContain('id="add-r"');
    expect(html).toContain('+ Adicionar');
  });

  it('renderiza emptyLabel quando items vazio e nao ha add', () => {
    const html = renderChipList({ label: 'X', items: [], emptyLabel: 'Nenhum' });
    expect(html).toContain('class="chip-list-empty"');
    expect(html).toContain('>Nenhum<');
  });

  it('passa removeId para cada chip', () => {
    const items = [{ id: 'a', label: 'CPF', removeId: 'rm-a' }];
    const html = renderChipList({ label: 'X', items });
    expect(html).toContain('id="rm-a"');
  });
});
