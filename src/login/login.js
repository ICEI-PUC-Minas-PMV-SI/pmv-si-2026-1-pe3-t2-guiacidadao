function login() {
    const ident = document.getElementById('login-id').value; // Input de CPF ou Email
    const pass = document.getElementById('login-pw').value;

    const usuarios = JSON.parse(localStorage.getItem('userlist') || '[]');

    // A busca checa se o identificador bate com o CPF OU com o Email
    const usuarioEncontrado = usuarios.find(u => 
        (u.cpf === ident || u.email === ident ) && u.pass === pass
    );

    if (usuarioEncontrado) {
        alert('Bem-vindo, ' + usuarioEncontrado.nome);
        
        // Armazena o objeto completo ou apenas o nome/email para referência
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioEncontrado));
        
        window.location.href = '/src/home/home.html';
    } else {
        alert('Credenciais inválidas.');
    }
}