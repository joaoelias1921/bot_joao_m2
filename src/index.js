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
const gerarVisualizacaoJogo = require("./helpers/gerarVisualizacaoJogo");
const aleatorio = require("./helpers/aleatorio");
const wallpapers = require("./data/wallpapers");
const locations = require("./data/locations");

// Criando o objeto "bot" e o instanciando como um novo objeto da classe Telegraf
const bot = new Telegraf(env.token);
const mensagemTeclado = "Ótimo! Agora, escolha uma das sub-categorias:";

// Iniciando o bot
bot.start(async ctx => {
    const from = ctx.update.message.from;
    // verificando se o usuário é do João ou do prof. Emerson
    if(from.id === 1351450134 || from.id === 5792995783){
        // respondendo com código HTML
        await ctx.replyWithHTML(`
            <b>Fala ${from.first_name.split(" ")[0]}, tranquilo?</b>
            \nSou um bot desenvolvido para o trabalho de M2 da disciplina de Sistemas de Apoio à Decisão!
            \nSou capaz de <b>recomendar jogos</b> de diversas categorias para você se divertir, basta enviar a palavra "<b>Jogar</b>"!
            \nTambém posso te enviar alguns wallpapers incríveis de jogos reconhecidos, pra você não esquecê-los. Digite "<b>Wallpaper</b>" para ver um deles!
            \nQuer saber de alguns locais curiosos relacionados aos games? Envie "<b>Curiosidade</b>" para ver um deles!
            \nMe envie um <i>emoji</i> que indique qual sua plataforma preferida (laptop, desktop, smartphone, console) para jogar nas horas vagas, sou curioso!
            \nCaso deseje, também posso fazer pesquisas na Steam para você! Basta enviar a palavra "<b>Steam</b>" que te informo melhor!
            \nAlém de tudo isso, ainda faço as funções básicas de um chatbot. Basta enviar a palavra "<b>Outros</b>" para ver o que eu posso fazer!
            \nConfira a <a href="https://core.telegram.org/bots/api">documentação oficial</a> dos bots para Telegram para mais informações.
        `);
    }else {
        // respondendo que o usuário não tem permissão e interrompendo seu funcionamento
        ctx.reply("Você não tem permissão para falar comigo!");
        bot.stop("Usuário não autorizado.");
    }
});

// tratando eventos de texto
bot.on("text", async (ctx, next) => {
    await ctx.reply(`A mensagem recebida foi: '${ctx.update.message.text}', mas, e ai, bora jogar?`);
    next();
});

// tratando eventos de localização
bot.on("location", ctx => {
    ctx.reply(`Suas coordenadas são:
        \nLatitude: ${ctx.update.message.location.latitude}
        \nLongitude: ${ctx.update.message.location.longitude}
        \nParece um bom lugar pra sentar e jogar, não acha?
    `);
});

// tratando eventos de contatos
bot.on("contact", ctx => {
    ctx.reply(`O telefone do(a) ${ctx.update.message.contact.first_name} é:
        \n${ctx.update.message.contact.phone_number}
        \nChama ele(a) pra uma partida!
    `)
});

// tratando eventos de áudio
bot.on("voice", ctx => {ctx.reply(`Que voz linda! Seu áudio tem ${ctx.update.message.voice.duration} segundos.`);});

// tratando eventos de imagem/foto
bot.on("photo", ctx => {
    const fotos = ctx.update.message.photo;
    ctx.reply("\nLembrando que as resoluções podem variar devido a compressão do Telegram!");
    let resolucoes = "";
    fotos.forEach((foto, i) => {
        resolucoes += `
            \nA resolução da ${i+1}ª foto é de:
            \n${foto.width} x ${foto.height} pixels!
        `
    });
    ctx.reply(resolucoes);
});

// tratando eventos de 'stickers'
bot.on("sticker", ctx =>{
    ctx.reply(`A figurinha 
        \n${ctx.update.message.sticker.emoji}
        \npertence ao conjunto ${ctx.update.message.sticker.set_name}`);
});

// utilizando o "hears" com array de expressões
bot.hears(["Jogar", "jogar"], ctx => {
    // respondendo com Markdown
    ctx.replyWithMarkdownV2(`
        Para você, eu tenho uma ótima seleção de games da atualidade, para PCs fracos, medianos e atuais\\! Basta dizer qual das categorias abaixo você deseja visualizar:
        *1 \\-* Ação
        *2 \\-* Ação/Aventura
        *3 \\-* RPG
        *4 \\-* Simulação
        *5 \\-* Estratégia \\(RTS/MOBA\\)
    `);
    bot.hears(["1", "2", "3", "4", "5"], ctx => {
        // descobrindo qual numero foi digitado e exibindo o teclado correspondente
        switch (ctx.update.message.text) {
            case "1":
                // exibindo subcategorias de ação, ouvindo resposta do usuário e enviando os jogos
                ctx.reply(mensagemTeclado, tecladoAcao);
                let recomendadosAcao = "";
                bot.hears("Plataforma", ctx => {
                    recomendadosAcao = gerarVisualizacaoJogo(aleatorio(jogosAcao.plataforma), "Plataforma"); 
                    ctx.reply(recomendadosAcao);
                });
                bot.hears("Tiro/FPS", ctx => {
                    recomendadosAcao = gerarVisualizacaoJogo(aleatorio(jogosAcao.tiro), "Tiro"); 
                    ctx.reply(recomendadosAcao);
                });
                bot.hears("Luta", ctx => {
                    recomendadosAcao = gerarVisualizacaoJogo(aleatorio(jogosAcao.luta), "Luta"); 
                    ctx.reply(recomendadosAcao);
                });
                bot.hears("Beat-em up", ctx => {
                    recomendadosAcao = gerarVisualizacaoJogo(aleatorio(jogosAcao.beatemup), "Beat-em"); 
                    ctx.reply(recomendadosAcao);
                });
                bot.hears("Furtivo", ctx => {
                    recomendadosAcao = gerarVisualizacaoJogo(aleatorio(jogosAcao.furtivo), "Stealth"); 
                    ctx.reply(recomendadosAcao);
                });
                bot.hears("Sobrevivência", ctx => {
                    recomendadosAcao = gerarVisualizacaoJogo(aleatorio(jogosAcao.sobrevivencia), "Sobrevivência"); 
                    ctx.reply(recomendadosAcao);
                });
                break;
            case "2":
                // exibindo subcategorias de ação/aventura, ouvindo resposta do usuário e enviando os jogos
                ctx.reply(mensagemTeclado, tecladoAcaoAventura);
                let recomendadosAcaoAv = "";
                bot.hears("Horror/Sobrevivência", ctx => {
                    recomendadosAcaoAv = gerarVisualizacaoJogo(aleatorio(jogosAcaoAv.horror), "Horror"); 
                    ctx.reply(recomendadosAcaoAv);
                });
                bot.hears("Metroidvania", ctx => {
                    recomendadosAcaoAv = gerarVisualizacaoJogo(aleatorio(jogosAcaoAv.metroidvania), "Metroidvania"); 
                    ctx.reply(recomendadosAcaoAv);
                });
                break;
            case "3":
                // exibindo subcategorias de RPG, ouvindo resposta do usuário e enviando os jogos
                ctx.reply(mensagemTeclado, tecladoRPG);
                let recomendadosRPG = "";
                bot.hears("RPG de Ação", ctx => {
                    recomendadosRPG = gerarVisualizacaoJogo(aleatorio(jogosRPG.acao), "Ação+RPG"); 
                    ctx.reply(recomendadosRPG);
                });
                bot.hears("MMORPG", ctx => {
                    recomendadosRPG = gerarVisualizacaoJogo(aleatorio(jogosRPG.mmorpg), "MMORPG"); 
                    ctx.reply(recomendadosRPG);
                });
                bot.hears("Roguelike", ctx => {
                    recomendadosRPG = gerarVisualizacaoJogo(aleatorio(jogosRPG.roguelike), "Roguelike"); 
                    ctx.reply(recomendadosRPG);
                });
                bot.hears("Sandbox", ctx => {
                    recomendadosRPG = gerarVisualizacaoJogo(aleatorio(jogosRPG.sandbox), "RPG+Sandbox"); 
                    ctx.reply(recomendadosRPG);
                });
                break;
            case "4":
                // exibindo subcategorias de simulaçõa, ouvindo resposta do usuário e enviando os jogos
                ctx.reply(mensagemTeclado, tecladoSimulacao);
                let recomendadosSimul = "";
                bot.hears("Construção e Gestão", ctx => {
                    recomendadosSimul = gerarVisualizacaoJogo(aleatorio(jogosSimulacao.construcao), "Construção"); 
                    ctx.reply(recomendadosSimul);
                })
                bot.hears("Vida", ctx => {
                    recomendadosSimul = gerarVisualizacaoJogo(aleatorio(jogosSimulacao.vida), "Vida"); 
                    ctx.reply(recomendadosSimul);
                })
                bot.hears("Veículos", ctx => {
                    recomendadosSimul = gerarVisualizacaoJogo(aleatorio(jogosSimulacao.veiculos), "Veículos"); 
                    ctx.reply(recomendadosSimul);
                })
                break;
            case "5":
                // exibindo subcategorias de estratégia, ouvindo resposta do usuário e enviando os jogos
                ctx.reply(mensagemTeclado, tecladoEstrategia);
                let recomendadosEstrat = "";
                bot.hears("RTS", ctx => {
                    recomendadosEstrat = gerarVisualizacaoJogo(aleatorio(jogosEstrategia.rts), "RTS"); 
                    ctx.reply(recomendadosEstrat);
                })
                bot.hears("MOBA", ctx => {
                    recomendadosEstrat = gerarVisualizacaoJogo(aleatorio(jogosEstrategia.moba), "MOBA"); 
                    ctx.reply(recomendadosEstrat);
                })
                break;
            default:
                ctx.reply("Esta opção de categoria não está disponível, tente novamente!");
        } 
    });
});

// aguardando evento específico para wallpaper, retornando um wallpaper aleatório da lista para o usuário
bot.hears(["Wallpaper", "wallpaper"], ctx => {
    ctx.replyWithMarkdownV2("*Estou enviando um wallpaper incrível para você\\!*");
    ctx.replyWithPhoto({
        url: `${aleatorio(wallpapers).url}`
    });
});

// aguardando evento específico para curiosidade, retornando uma curiosidade aleatória da lista para o usuário,
// com localização, imagem e descrição
bot.hears(["Curiosidade", "curiosidade"], async ctx => {
    const localSorteado = aleatorio(locations);
    await ctx.replyWithPhoto(localSorteado.img);
    await ctx.reply(localSorteado.descricao);
    await ctx.reply("Veja abaixo a localização real (aproximada) na qual o jogo foi baseado:");
    await ctx.replyWithLocation(localSorteado.latitude, localSorteado.longitude);
});

// utilizando o "hears" para emojis
bot.hears(["💻", "🖥", "🕹", "📱"], ctx => {
    const emoji = ctx.update.message.text;
    ctx.reply(`Que show que você gosta de jogar no ${emoji}! Eu jogo em todos!`);
});

// utilizando o "hears" com expressões regulares
bot.hears(/steam/i, ctx => {
    ctx.replyWithHTML(`
        Deseja pesquisar algo específico na biblioteca da Steam? 
        \nMe diga o que é com o formato "<b>s-suapesquisa</b>", que pesquiso pra você!
        \n<b>Dica: para buscas compostas, utilize "+" no lugar dos espaços!</b>
        \nExemplo: s-ação+e+aventura
    `);
    bot.hears(/s-/i, ctx => {
        const pesquisa = ctx.update.message.text.split("-")[1];
        ctx.reply(`
            https://store.steampowered.com/search/?term=${pesquisa}
            \nDeu certo! Acesse o link acima para visualizar.
        `);
    });
});

// aguardando evento específico para outros, retornando ao usuário uma lista com as funcionalidades do bot
bot.hears(["Outros", "outros"], ctx => {
    ctx.replyWithHTML(`
        <b>Dê uma olhada no que posso fazer:</b>
        \n\n- Repetir o que você digita
        \n- Informar as coordenadas de uma localização que você me fornecer
        \n- Dizer o nome e o número de um contato que você passar
        \n- Reproduzo suas mensagens de áudio e retorno a sua duração
        \n- Com minha trena, tiro e te informo as medidas de quaisquer fotos que você me enviar
        \n- Se você me mandar uma figurinha, te retorno qual seu <i>emoji</i> e o seu conjunto
    `);
});

// Iniciando o "polling" com o servidor para verificar se há
// novas mensagens e/ou conversas
bot.startPolling();