/**
 * ===== ADICIONAR / EDITAR ENDEREÇO =====
 * Gerencia um único endereço por usuário no localStorage.
 */

function carregarDadosEndereco() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (!usuarioLogado) return;

    const usuario = JSON.parse(usuarioLogado);
    const key = `endereco_${usuario.id || usuario.cpf}`;
    const dados = localStorage.getItem(key);
    const endereco = dados ? JSON.parse(dados).enderecos?.[0] : null;

    const titleEl = document.getElementById('endereco-page-title');
    const subtitleEl = document.getElementById('endereco-page-subtitle');

    if (endereco) {
        document.getElementById('endereco-condicao').value = endereco.condicaoMoradia || '';
        document.getElementById('endereco-cep').value = endereco.cep || '';
        if (titleEl) titleEl.textContent = 'Editar Endereço';
        if (subtitleEl) subtitleEl.textContent = 'Altere as informações do seu endereço';
    }
}

function salvarEndereco() {
    const condicao = document.getElementById('endereco-condicao').value;
    let cep = document.getElementById('endereco-cep').value.trim();

    if (!condicao) {
        alert('Selecione a condição de moradia.');
        return;
    }

    cep = cep.replace(/\D/g, '');

    const usuarioLogado = localStorage.getItem('usuarioLogado');
    if (!usuarioLogado) {
        alert('Nenhum usuário logado. Faça login primeiro.');
        window.location.href = '/src/pages/login/login.html';
        return;
    }

    const usuario = JSON.parse(usuarioLogado);
    const key = `endereco_${usuario.id || usuario.cpf}`;
    const dados = localStorage.getItem(key);
    const enderecoExistente = dados ? JSON.parse(dados).enderecos?.[0] : null;

    const endereco = {
        id: enderecoExistente ? enderecoExistente.id : 1,
        condicaoMoradia: condicao,
        cep: cep || ''
    };

    localStorage.setItem(key, JSON.stringify({ enderecos: [endereco] }));

    alert(enderecoExistente
        ? 'Endereço atualizado com sucesso!'
        : 'Endereço salvo com sucesso!');
    window.location.href = '/src/pages/meu-perfil/meu-perfil.html';
}

document.addEventListener('DOMContentLoaded', carregarDadosEndereco);
