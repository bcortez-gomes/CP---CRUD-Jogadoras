const jogadorasIniciais = [
    {
        nome: "Andressa Alves",
        posicao: "Meio-campo",
        clube: "Corinthians",
        foto: "https://example.com/andressa.jpg",
        gols: 15,
        assistencias: 10,
        jogos: 28,
        favorita: false,
    },
    {
        nome: "Dayana Rodríguez",
        posicao: "Meio-campo",
        clube: "Corinthians",
        foto: "https://example.com/dayana.jpg",
        gols: 5,
        assistencias: 12,
        jogos: 30,
        favorita: false,
    },
    {
        nome: "Mariza",
        posicao: "Zagueira",
        clube: "Corinthians",
        foto: "https://example.com/mariza.jpg",
        gols: 2,
        assistencias: 1,
        jogos: 32,
        favorita: false,
    },
];

if (!localStorage.getItem("jogadoras")) {
    localStorage.setItem("jogadoras", JSON.stringify(jogadorasIniciais));
}

function carregarJogadoras() {
    return JSON.parse(localStorage.getItem("jogadoras"));
}

function renderizarJogadoras() {
    const lista = document.getElementById("listaJogadoras");
    lista.innerHTML = "";

    const jogadoras = carregarJogadoras();

    jogadoras.forEach((jogadora, index) => {
        lista.innerHTML += `
        <div class="card">
            <img src="${jogadora.foto}" alt="${jogadora.nome}">
            <h3>${jogadora.nome}</h3>
            <p>${jogadora.posicao} - ${jogadora.clube}</p>
            <p>Gols: ${jogadora.gols}</p>
            <p>Assistências: ${jogadora.assistencias}</p>
            <p>Jogos: ${jogadora.jogos}</p>
            <span class="favorita">${jogadora.favorita ? "⭐" : "⭐"}</span>
        </div>
    `;
    });
}

function renderizarJogadoras() {
    const lista = document.getElementById("listaJogadoras");
    lista.innerHTML = "";

    const jogadoras = carregarJogadoras();

    jogadoras.forEach((jogadora, index) => {
        lista.innerHTML += `
        <div class="card">
            <img src="${jogadora.foto}" alt="${jogadora.nome}">
            <h3>${jogadora.nome}</h3>
            <p>${jogadora.posicao} - ${jogadora.clube}</p>
            <p>Gols: ${jogadora.gols}</p>
            <p>Assistências: ${jogadora.assistencias}</p>
            <p>Jogos: ${jogadora.jogos}</p>
            
            <span class="favorita" onclick="toggleFavorita(${index})">
            ${jogadora.favorita ? "⭐" : "⭐"}
            </span>

            <div class="acoes">
            <button onclick="editarJogadora(${index})">Editar</button>
            <button onclick="removerJogadora(${index})">Excluir</button>
            </div>
        </div>
    `;
    });
}

function salvarJogadoras(jogadoras) {
    localStorage.setItem("jogadoras", JSON.stringify(jogadoras));
}

document.getElementById("formJogadora").addEventListener("submit", function (e) {
    e.preventDefault();

    const jogadoras = carregarJogadoras();

    const nova = {
        nome: document.getElementById("nome").value,
        posicao: document.getElementById("posicao").value,
        clube: document.getElementById("clube").value,
        gols: document.getElementById("gols").value,
        assistencias: document.getElementById("assistencias").value,
        jogos: document.getElementById("jogos").value,
        foto: document.getElementById("foto").value,
        favorita: false
    };

    if (!nova.nome || !nova.posicao || !nova.clube || !nova.foto) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return;
    }

    jogadoras.push(nova);
    salvarJogadoras(jogadoras);

    renderizarJogadoras();

    alert("Jogadora adicionada com sucesso!");
    e.target.reset();
});

function editarJogadora(index) {
    const jogadoras = carregarJogadoras();
    const jogadora = jogadoras[index];

    const novoNome = prompt("Nome:", jogadora.nome) || jogadora.nome;
    const novaPosicao = prompt("Posição:", jogadora.posicao) || jogadora.posicao;
    const novoClube = prompt("Clube:", jogadora.clube) || jogadora.clube;
    const novosGols = prompt("Gols:", jogadora.gols) || jogadora.gols;
    const novasAssistencias = prompt("Assistências:", jogadora.assistencias) || jogadora.assistencias;
    const novosJogos = prompt("Jogos:", jogadora.jogos) || jogadora.jogos;
    const novaFoto = prompt("URL da Foto:", jogadora.foto) || jogadora.foto;

    jogadoras[index] = {
        nome: novoNome,
        posicao: novaPosicao,
        clube: novoClube,
        gols: novosGols,
        assistencias: novasAssistencias,
        jogos: novosJogos,
        foto: novaFoto,
        favorita: jogadora.favorita
    };

    salvarJogadoras(jogadoras);
    renderizarJogadoras();
    alert("Jogadora editada com sucesso!");
}

function removerJogadora(index) {
    const jogadoras = carregarJogadoras();

    if (confirm(`Tem certeza que deseja remover ${jogadoras[index].nome}?`)) {
        jogadoras.splice(index, 1);
        salvarJogadoras(jogadoras);
        renderizarJogadoras();
        alert("Jogadora removida com sucesso!");
    }
}

