function jogoAleatorio(lista) {
    return lista[Math.floor(Math.random()*lista.length)];
}

module.exports = jogoAleatorio;