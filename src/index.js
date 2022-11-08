// importando as variáveis de ambiente
const env = require("../.env");

// importando a biblioteca "Telegraf"
const { Telegraf } = require("telegraf");

// Criando o objeto "bot" e o instanciando como um novo objeto da classe Telegraf
const bot = new Telegraf(env.token);

// Iniciando o bot
bot.start(ctx => {
    const from = ctx.update.message.from;
    ctx.reply(`Olá! Seja bem-vindo ${from.first_name}!`);
});

// dando continuidade a conversa
bot.on("text", async (ctx, next) => {
    await ctx.reply("Resposta 1");
    next();
});

bot.on("text", async (ctx, next) => {
    await ctx.reply("Resposta 2");
    next()
});

bot.on("text", async (ctx, next) => {
    await ctx.reply("Resposta 3");
});

// Iniciando o "polling" com o servidor para verificar se há
// novas mensagens e/ou conversas
bot.startPolling();