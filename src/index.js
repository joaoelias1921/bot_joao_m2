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
            \nPara você, eu tenho uma ótima seleção de games da atualidade, para PCs fracos e fortes! Basta dizer qual das categorias abaixo você deseja visualizar:
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
            // exibindo o teclado, ouvindo resposta do usuário e enviando os jogos
            ctx.reply(mensagemTeclado, tecladoAcao);
            bot.hears([
                "Plataforma", "Tiro/FPS", "Luta",
                "Beat-em up", "Furtivo",
                "Sobrevivência", "Rítmico"
            ]);
            break;
        case "2":
            ctx.reply(mensagemTeclado, tecladoAcaoAventura);
            bot.hears([
                "Horror/Sobrevivência", "Metroidvania",
            ]);
            break;
        case "3":
            ctx.reply(mensagemTeclado, tecladoRPG);
            bot.hears([
                "RPG de Ação", "MMORPG",
                "Roguelike", "Sandbox"
            ]);
            break;
        case "4":
            ctx.reply(mensagemTeclado, tecladoSimulacao);
            bot.hears([
                "Construção e Gestão",
                "Vida", "Veículos"
            ]);
            break;
        case "5":
            ctx.reply(mensagemTeclado, tecladoEstrategia);
            bot.hears([
                "RTS", "MOBA"
            ]);
            break;
    } 
});

// Iniciando o "polling" com o servidor para verificar se há
// novas mensagens e/ou conversas
bot.startPolling();