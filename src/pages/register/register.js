const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

function registrar() {
    const nome = document.getElementById('cad-nome').value.trim();
    const cpfDigitado = document.getElementById('cad-cpf').value;
    const data = document.getElementById('cad-dob').value;
    const email = document.getElementById('cad-email').value.trim().toLowerCase();
    const pass = document.getElementById('cad-pw').value;
    const pass2 = document.getElementById('cad-pw2').value;
    const aceitouTermos = document.getElementById('cad-terms')?.checked ?? true;

    if (!nome || !cpfDigitado || !email || !pass) {
        alert('Preencha os campos obrigatórios.');
        return;
    }

    const cpf = limparCpf(cpfDigitado);
    if (!validarCpf(cpf)) {
        alert('CPF inválido. Confira os números informados.');
        return;
    }

    if (!validarEmail(email)) {
        alert('E-mail inválido.');
        return;
    }

    if (pass.length < 6) {
        alert('A senha precisa ter ao menos 6 caracteres.');
        return;
    }

    if (pass !== pass2) {
        alert('As senhas não coincidem.');
        return;
    }

    if (!aceitouTermos) {
        alert('Você precisa aceitar os termos de uso para criar uma conta.');
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('userlist') || '[]');

    if (usuarios.find((u) => limparCpf(u.cpf) === cpf || u.email === email)) {
        alert('CPF ou e-mail já cadastrados.');
        return;
    }

    const novoUsuario = {
        id: `usr-${Date.now()}`,
        nome,
        cpf,
        email,
        data,
        pass
    };

    usuarios.push(novoUsuario);
    localStorage.setItem('userlist', JSON.stringify(usuarios));
    alert('Cadastro realizado! Faça login para continuar.');
    window.location.href = '/src/pages/login/login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const cpfInput = document.getElementById('cad-cpf');
    if (cpfInput && typeof aplicarMascaraCpf === 'function') {
        aplicarMascaraCpf(cpfInput);
    }
});
