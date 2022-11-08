function gerarVisualizacaoJogo(jogo, genero) {
    const stringJogos = `
        Aproveite!
        \nJogo: ${jogo.titulo}
        \nOnde adquirir: ${jogo.link}
        \n\nNão encontrou o que desejava? Veja a biblioteca da Steam para este gênero:
        \nhttps://store.steampowered.com/search/?term=${genero}
    `;
    return stringJogos;
}

module.exports = gerarVisualizacaoJogo;