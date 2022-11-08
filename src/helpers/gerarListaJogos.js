function gerarListaJogos(lista, genero) {
    let stringJogos = "Aproveite a seleção de jogos abaixo!\n";
    lista.forEach((jogo) => {
        stringJogos += `\n\n${jogo.titulo}\n${jogo.link}`;
    });

    stringJogos += `
        \n\nNão encontrou o que desejava? Veja a biblioteca da Steam para este gênero:
        \nhttps://store.steampowered.com/search/?term=${genero}
    `;
    return stringJogos;
}

module.exports = gerarListaJogos;