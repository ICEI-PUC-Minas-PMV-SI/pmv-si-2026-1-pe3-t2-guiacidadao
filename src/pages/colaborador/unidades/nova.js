const init = () => {
  document.getElementById('header-slot').innerHTML = renderHeader({
    title: 'Nova unidade',
    backHref: '/src/pages/colaborador/unidades/lista.html'
  });

  const hint = '<p class="form-hint-right">* Campos obrigatórios</p>';

  const camposTopo = [
    renderInput({ label: 'Nome da unidade', required: true, placeholder: 'Ex: CRAS Centro', id: 'novo-nome' }),
    renderSelect({
      label: 'Tipo',
      required: true,
      placeholder: 'Selecione o tipo',
      options: MOCK_UNIDADE_TYPES,
      id: 'novo-tipo'
    }),
    renderInput({ label: 'Endereco completo', required: true, placeholder: 'Ex: Rua XV de Novembro, 100', id: 'novo-endereco' })
  ].join('');

  const splitRow = `
    <div class="split-row">
      ${renderInput({ label: 'CEP', required: true, placeholder: '00000-000', id: 'novo-cep' })}
      ${renderInput({ label: 'Telefone', placeholder: '(00) 00000-0000', id: 'novo-telefone' })}
    </div>
  `;

  const horario = renderInput({
    label: 'Horario de funcionamento',
    required: true,
    placeholder: 'Ex: Seg a Sex, 08h as 17h',
    id: 'novo-horario'
  });

  const beneficiosBlock = `
    <section class="benefits-block">
      <span class="benefits-title">Benefícios atendidos</span>
      <span class="benefits-hint">Selecione os beneficios que esta unidade atende.</span>
      ${renderChipList({
        items: [
          { id: 'tmp-bf', label: 'Bolsa Família' },
          { id: 'tmp-bpc', label: 'BPC, LOAS' }
        ],
        emptyLabel: 'Nenhum beneficio vinculado.',
        addLabel: '+ Adicionar',
        addId: 'btn-add-beneficio'
      })}
    </section>
  `;

  const acoes = `
    <div class="form-actions">
      ${renderButton({ children: 'Cancelar', variant: 'outline', id: 'btn-cancelar' })}
      ${renderButton({ children: 'Salvar', id: 'btn-salvar' })}
    </div>
  `;

  document.getElementById('main-slot').innerHTML = `
    <div class="form-shell">
      ${hint}
      ${camposTopo}
      ${splitRow}
      ${horario}
      ${renderDivider()}
      ${beneficiosBlock}
      ${acoes}
    </div>
  `;

  document.getElementById('btn-cancelar').addEventListener('click', () => {
    if (confirm('Descartar alterações?')) {
      window.location.href = '/src/pages/colaborador/unidades/lista.html';
    }
  });

  document.getElementById('btn-salvar').addEventListener('click', () => {
    const nome = document.getElementById('novo-nome').value.trim();
    if (!nome) {
      alert('Preencha o nome da unidade.');
      return;
    }
    const nova = {
      id: proximoIdColecao(STORAGE_COLECOES.unidades, 'uni'),
      name: nome,
      type: document.getElementById('novo-tipo').value,
      address: document.getElementById('novo-endereco').value.trim(),
      cep: document.getElementById('novo-cep').value.trim(),
      phone: document.getElementById('novo-telefone').value.trim(),
      schedule: document.getElementById('novo-horario').value.trim(),
      benefits: [],
      status: 'ativo'
    };
    salvarColecao(STORAGE_COLECOES.unidades, nova);
    window.location.href = '/src/pages/colaborador/unidades/lista.html';
  });

  document.getElementById('btn-add-beneficio').addEventListener('click', () => {
    window.location.href = '/src/pages/colaborador/modais/adicionar-beneficio.html';
  });
};

document.addEventListener('DOMContentLoaded', init);
