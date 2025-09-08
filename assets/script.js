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

    const jogadoras = filtrarJogadorasSimples();

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
                ${jogadora.favorita
                ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="gold" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
                    </svg>`
                : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="gold" stroke-width="2" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z"/>
                    </svg>`}
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

function toggleFavorita(index) {
    const jogadoras = carregarJogadoras();
    jogadoras[index].favorita = !jogadoras[index].favorita;
    salvarJogadoras(jogadoras);
    renderizarJogadoras();
}

function filtrarJogadorasSimples() {
    const busca = document.getElementById("busca").value.toLowerCase();
    const filtroClube = document.getElementById("filtroClube").value;
    const ordenar = document.getElementById("ordenar").value;

    let jogadoras = carregarJogadoras();

    if (busca) {
        jogadoras = jogadoras.filter(j =>
            j.nome.toLowerCase().includes(busca) ||
            j.posicao.toLowerCase().includes(busca)
        );
    }

    if (filtroClube) {
        jogadoras = jogadoras.filter(j => j.clube === filtroClube);
    }

    if (ordenar === "nome") jogadoras.sort((a, b) => a.nome.localeCompare(b.nome));
    if (ordenar === "posicao") jogadoras.sort((a, b) => a.posicao.localeCompare(b.posicao));

    return jogadoras;
}

document.getElementById("busca").addEventListener("input", renderizarJogadoras);
document.getElementById("filtroClube").addEventListener("change", renderizarJogadoras);
document.getElementById("ordenar").addEventListener("change", renderizarJogadoras);