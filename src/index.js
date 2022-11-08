// importando as variáveis de ambiente
const env = require("../.env");

// importando a biblioteca "Telegraf"
const { Telegraf } = require("telegraf");
const {
    tecladoAcao,
    tecladoAcaoAventura,
    tecladoRPG,
    tecladoSimulacao,
    tecladoEstrategia
} = require("./data/teclados");
const jogosAcao = require("./data/jogosAcao");
const jogosAcaoAv = require("./data/jogosAcaoAv");
const jogosRPG = require("./data/jogosRPG");
const jogosSimulacao = require("./data/jogosSimulacao");
const jogosEstrategia = require("./data/jogosEstrategia");
const gerarListaJogos = require("./helpers/gerarListaJogos");

// Criando o objeto "bot" e o instanciando como um novo objeto da classe Telegraf
const bot = new Telegraf(env.token);
const mensagemTeclado = "Ótimo! Agora, escolha uma das sub-categorias:";

// Iniciando o bot
bot.start(ctx => {
    const from = ctx.update.message.from;
    if(from.id === 1351450134 || from.id === 5792995783){
        ctx.reply(`
            Fala ${from.first_name.split(" ")[0]}, tranquilo?
            \nSou um bot desenvolvido para o trabalho de M2 da disciplina de Sistemas de Apoio à Decisão!
            \nPara você, eu tenho uma ótima seleção de games da atualidade, para PCs fracos, medianos e atuais! Basta dizer qual das categorias abaixo você deseja visualizar:
            \n1 - Ação
            \n2 - Ação/Aventura
            \n3 - RPG
            \n4 - Simulação
            \n5 - Estratégia (RTS/MOBA)
        `);
    }else {
        ctx.reply("Você não tem permissão para falar comigo!")
    }
});

// utilizando o "hears" com array de expressões
bot.hears(["1", "2", "3", "4", "5"], ctx => {
    // descobrindo qual numero foi digitado e exibindo o teclado correspondente
    switch (ctx.update.message.text) {
        case "1":
            // exibindo subcategorias de ação, ouvindo resposta do usuário e enviando os jogos
            ctx.reply(mensagemTeclado, tecladoAcao);
            let recomendadosAcao = "";
            bot.hears("Plataforma", ctx => {recomendadosAcao = gerarListaJogos(jogosAcao.plataforma, "Plataforma"); ctx.reply(recomendadosAcao);});
            bot.hears("Tiro/FPS", ctx => {recomendadosAcao = gerarListaJogos(jogosAcao.tiro, "Tiro"); ctx.reply(recomendadosAcao);});
            bot.hears("Luta", ctx => {recomendadosAcao = gerarListaJogos(jogosAcao.luta, "Luta"); ctx.reply(recomendadosAcao);});
            bot.hears("Beat-em up", ctx => {recomendadosAcao = gerarListaJogos(jogosAcao.beatemup, "Beat-em"); ctx.reply(recomendadosAcao);});
            bot.hears("Furtivo", ctx => {recomendadosAcao = gerarListaJogos(jogosAcao.furtivo, "Stealth"); ctx.reply(recomendadosAcao);});
            bot.hears("Sobrevivência", ctx => {recomendadosAcao = gerarListaJogos(jogosAcao.sobrevivencia, "Sobrevivência"); ctx.reply(recomendadosAcao);});
            break;
        case "2":
            // exibindo subcategorias de ação/aventura, ouvindo resposta do usuário e enviando os jogos
            ctx.reply(mensagemTeclado, tecladoAcaoAventura);
            let recomendadosAcaoAv = "";
            bot.hears("Horror/Sobrevivência", ctx => {recomendadosAcaoAv = gerarListaJogos(jogosAcaoAv.horror); ctx.reply(recomendadosAcaoAv);});
            bot.hears("Metroidvania", ctx => {recomendadosAcaoAv = gerarListaJogos(jogosAcaoAv.metroidvania); ctx.reply(recomendadosAcaoAv);});
            break;
        case "3":
            // exibindo subcategorias de RPG, ouvindo resposta do usuário e enviando os jogos
            ctx.reply(mensagemTeclado, tecladoRPG);
            let recomendadosRPG = "";
            bot.hears("RPG de Ação", ctx => {recomendadosRPG = gerarListaJogos(jogosRPG.acao); ctx.reply(recomendadosRPG);});
            bot.hears("MMORPG", ctx => {recomendadosRPG = gerarListaJogos(jogosRPG.mmorpg); ctx.reply(recomendadosRPG);});
            bot.hears("Roguelike", ctx => {recomendadosRPG = gerarListaJogos(jogosRPG.roguelike); ctx.reply(recomendadosRPG);});
            bot.hears("Sandbox", ctx => {recomendadosRPG = gerarListaJogos(jogosRPG.sandbox); ctx.reply(recomendadosRPG);});
            break;
        case "4":
            // exibindo subcategorias de simulaçõa, ouvindo resposta do usuário e enviando os jogos
            ctx.reply(mensagemTeclado, tecladoSimulacao);
            let recomendadosSimul = "";
            bot.hears("Construção e Gestão", ctx => {recomendadosSimul = gerarListaJogos(jogosSimulacao.construcao); ctx.reply(recomendadosSimul);})
            bot.hears("Vida", ctx => {recomendadosSimul = gerarListaJogos(jogosSimulacao.vida); ctx.reply(recomendadosSimul);})
            bot.hears("Veículos", ctx => {recomendadosSimul = gerarListaJogos(jogosSimulacao.veiculos); ctx.reply(recomendadosSimul);})
            break;
        case "5":
            // exibindo subcategorias de estratégia, ouvindo resposta do usuário e enviando os jogos
            ctx.reply(mensagemTeclado, tecladoEstrategia);
            let recomendadosEstrat = "";
            bot.hears("RTS", ctx => {recomendadosEstrat = gerarListaJogos(jogosEstrategia.rts); ctx.reply(recomendadosEstrat);})
            bot.hears("MOBA", ctx => {recomendadosEstrat = gerarListaJogos(jogosEstrategia.moba); ctx.reply(recomendadosEstrat);})
            break;
    } 
});

// Iniciando o "polling" com o servidor para verificar se há
// novas mensagens e/ou conversas
bot.startPolling();