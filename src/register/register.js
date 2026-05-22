function registrar() {
    const nome = document.getElementById('cad-nome').value;
    const cpf = document.getElementById('cad-cpf').value;
    const data = document.getElementById('cad-dob').value;
    const email = document.getElementById('cad-email').value;
    const pass = document.getElementById('cad-pw').value;

    if (!nome || !cpf || !email || !pass) {
        alert('Preencha os campos obrigatórios.');
        return;
    }
    
    // verifica se as senhas estão iguais

    const campo1 = document.getElementById("cad-pw").value; //campo senha
    const campo2 = document.getElementById("cad-pw2").value; //campo confirma senha

    if (campo1 !== campo2) {
        alert("As senhas não coincidem!");
        return false; 
    } 

    let usuarios = JSON.parse(localStorage.getItem('userlist') || '[]');

    // verifica se ja tem conta com esse cpf e email
    if (usuarios.find(u => u.cpf === cpf || u.email === email)) {
        alert('CPF ou Email já cadastrados!');
        return;
    }

    // cria o bixo
    const novoUsuario = { nome, cpf, email, data, pass };

    //alerta e manda pro login
    usuarios.push(novoUsuario);
    localStorage.setItem('userlist', JSON.stringify(usuarios));
    alert('Cadastro realizado!');
    window.location.href = "/src/login/login.html";
}

