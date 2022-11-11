// função responsável por gerar o texto exibido para os jogos recomendados
function gerarVisualizacaoJogo(jogo, genero) {
    const stringJogos = `
        Aproveite!
        \nJogo: ${jogo.titulo}
        \nOnde adquirir: ${jogo.link}
        \n\nNão encontrou o que desejava? Utilize o bot novamente ou veja a biblioteca da Steam para este gênero:
        \nhttps://store.steampowered.com/search/?term=${genero}
    `;
    return stringJogos;
}

module.exports = gerarVisualizacaoJogo;