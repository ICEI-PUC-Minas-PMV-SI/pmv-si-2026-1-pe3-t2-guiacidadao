/**
 * ===== ADICIONAR MEMBRO =====
 * Gerencia o formulário de cadastro de novos membros no perfil familiar.
 * Os dados são salvos no localStorage e ficam disponíveis para a página
 * de Perfil Familiar exibir.
 */

/**
 * Calcula a idade a partir da data de nascimento.
 * @param {string} dataNascimento - Data no formato YYYY-MM-DD
 * @returns {number} Idade calculada em anos
 */
function calcularIdade(dataNascimento) {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento + 'T00:00:00');
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mesDiff = hoje.getMonth() - nascimento.getMonth();

    if (mesDiff < 0 || (mesDiff === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }

    return idade;
}

/**
 * Gera um ID único para o novo membro.
 * @returns {number} ID sequencial baseado nos membros existentes
 */
function gerarIdMembro(membros) {
    if (membros.length === 0) return 1;
    return Math.max(...membros.map(m => m.id)) + 1;
}

/**
 * Adiciona um novo membro ao perfil familiar.
 * Valida todos os campos, calcula a idade a partir da data de nascimento
 * e persiste os dados no localStorage.
 */
function adicionarMembro() {
    // Captura os campos
    const nome = document.getElementById('membro-nome').value.trim();
    const dataNascimento = document.getElementById('membro-dob').value;
    const parentesco = document.getElementById('membro-parentesco').value;
    const vinculo = document.getElementById('membro-vinculo').value;
    const rendaRaw = document.getElementById('membro-renda').value;

    // --- Validações ---

    if (!nome) {
        alert('Preencha o nome completo do membro.');
        return;
    }

    if (!dataNascimento) {
        alert('Informe a data de nascimento.');
        return;
    }

    // Valida se a data é futura
    const hoje = new Date();
    hoje.setHours(23, 59, 59, 999);
    if (new Date(dataNascimento + 'T00:00:00') > hoje) {
        alert('A data de nascimento não pode ser no futuro.');
        return;
    }

    if (!parentesco) {
        alert('Selecione o parentesco.');
        return;
    }

    if (!vinculo) {
        alert('Selecione o vínculo.');
        return;
    }

    // Processa a renda: aceita tanto "1500" quanto "1500,50"
    let rendaMensal = 0;
    if (rendaRaw) {
        rendaMensal = parseFloat(rendaRaw.replace(',', '.'));
        if (isNaN(rendaMensal) || rendaMensal < 0) {
            alert('Informe um valor válido para a renda mensal.');
            return;
        }
    }

    // Calcula a idade
    const idade = calcularIdade(dataNascimento);

    // Obtém o usuário logado para chave personalizada
    const usuarioLogado = localStorage.getItem('usuarioLogado');

    if (!usuarioLogado) {
        alert('Nenhum usuário logado. Faça login primeiro.');
        window.location.href = '/src/pages/login/login.html';
        return;
    }

    const usuario = JSON.parse(usuarioLogado);
    const usuarioId = usuario.id || usuario.cpf;

    // Carrega dados atuais da família
    const familiaKey = `familia_${usuarioId}`;
    const familiaLocalStorage = localStorage.getItem(familiaKey);
    const familiaData = familiaLocalStorage
        ? JSON.parse(familiaLocalStorage)
        : { membros: [] };

    // Cria o novo membro
    const novoMembro = {
        id: gerarIdMembro(familiaData.membros),
        nome: nome,
        idade: idade,
        parentesco: parentesco,
        vinculo: vinculo,
        rendaMensal: rendaMensal
    };

    // Adiciona e persiste
    familiaData.membros.push(novoMembro);
    localStorage.setItem(familiaKey, JSON.stringify(familiaData));

    // Feedback e redirecionamento
    alert('Membro adicionado com sucesso!');
    window.location.href = '/src/pages/perfil-familiar/perfil-familiar.html';
}
