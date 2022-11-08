function gerarListaJogos(lista) {
    let stringJogos = "Aproveite a seleção de jogos abaixo!\n";
    lista.forEach((jogo) => {
        stringJogos += `\n\n${jogo.titulo}\n${jogo.link}`;
    });
    return stringJogos;
}

module.exports = gerarListaJogos;