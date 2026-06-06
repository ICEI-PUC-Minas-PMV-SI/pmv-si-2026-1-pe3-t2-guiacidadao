function carregarDados() {
    const dados = localStorage.getItem("documentos");

    if (dados) {
        documentos = JSON.parse(dados);
    }
}

function salvarDados() {
    localStorage.setItem("documentos", JSON.stringify(documentos));
}

let documentos = [];

    function addDocumento() {
        const input = document.getElementById("docInput");
        const nome = input.value.trim();

        if (!nome) return;

        documentos.push({
            nome: nome,
            status: "pendente"
        });

        input.value = "";
        render();
    }

    function setStatus(index, status) {
        documentos[index].status = status;
        render();
    }

    function removerDocumento(index) {
        documentos.splice(index, 1);
        render();
    }

    function render() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    let obtidos = 0;

    documentos.forEach((doc, index) => {
        if (doc.status === "obtido") obtidos++;

        const item = document.createElement("div");
        item.className = "doc-item";

        item.innerHTML = `
        <div class="beneficiocard" style="border-left: none;">
            <span>${doc.nome}</span>
            <div class="btn">
                <button class="mini-btn"  style="background-color: #FFC13D; color: white;"onclick="setStatus(${index}, 'pendente')">Pendente</button>
                <button class="mini-btn" style="background-color: #58BC6C; color: white;" onclick="setStatus(${index}, 'obtido')">Obtido</button>
                <button class="mini-btn" style="background-color: #FF6E60; color: white;" onclick="removerDocumento(${index})">Remover</button>
            </div>
        </div>
        `;

        lista.appendChild(item);
    });

    atualizarProgresso(obtidos, documentos.length);


    salvarDados();
    }  

    function atualizarProgresso(obtidos, total) {
        const progress = document.getElementById("progress");
        const text = document.getElementById("progressText");

        let porcentagem = total === 0 ? 0 : (obtidos / total) * 100;

        progress.style.width = porcentagem + "%";
        text.innerText = Math.round(porcentagem) + "% concluído";
    }

    carregarDados();
    render();