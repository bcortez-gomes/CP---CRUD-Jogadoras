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

renderizarJogadoras();
