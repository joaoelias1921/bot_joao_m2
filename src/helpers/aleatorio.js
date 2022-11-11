// função responsável por retornar um valor aleatório a partir de um array
function aleatorio(lista) {
    return lista[Math.floor(Math.random()*lista.length)];
}

module.exports = aleatorio;