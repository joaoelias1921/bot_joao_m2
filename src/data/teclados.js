const { Markup } = require("telegraf");

// criando o teclado de jogos de ação
const tecladoAcao = Markup.keyboard([
    ["Plataforma", "Tiro/FPS", "Luta"],
    ["Beat-em up", "Furtivo"],
    ["Sobrevivência"]
])
.resize();

// criando o teclado de jogos de ação/aventura
const tecladoAcaoAventura = Markup.keyboard([
    ["Horror/Sobrevivência", "Metroidvania"],
])
.resize();

const tecladoRPG = Markup.keyboard([
    ["RPG de Ação", "MMORPG"],
    ["Roguelike", "Sandbox"]
])
.resize();

const tecladoSimulacao = Markup.keyboard([
    ["Construção e Gestão"],
    ["Vida", "Veículos"]
])
.resize();

const tecladoEstrategia = Markup.keyboard([
    ["RTS", "MOBA"]
])
.resize();

// exportando os teclados
module.exports = {
    tecladoAcao,
    tecladoAcaoAventura,
    tecladoRPG,
    tecladoSimulacao,
    tecladoEstrategia
}