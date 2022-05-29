import 'module-alias/register'
import 'source-map-support/register'
import env from '@/helpers/env';
import { Update } from 'typegram';
import { post } from '@/helpers/post';
import { Context, Telegraf } from 'telegraf';

const bot: Telegraf<Context<Update>> = new Telegraf(env.TOKEN)

bot.start((ctx) => {
    ctx.reply('Привет ' + ctx.from.first_name + '!')
    ctx.reply('Этот бот создаёт защищённые заметки.\n'
    + 'Чтобы узнать больше, отправь команду /help')
})

bot.help((ctx) => {
    ctx.reply('/post '
    + 'для отправки сообщения которое сможешь прочитать только ты\n\n'
    + '/allpost '
    + 'для отправки сообщения которое сможет прочесть кто-то другой\n'
    + '(по паролю)\n\n'
    + '/get для получения сообщения')
})

bot.command('post', (ctx) => {
    ctx.reply('Отправь текст сообщения')
    const flag = 'true'
    bot.on('text', (ctx) => {
        post(ctx.message.text, ctx.from.id, ctx, flag)
        ctx.deleteMessage(ctx.message.message_id)
    })
})

bot.command('allpost', (ctx) => {
    ctx.reply('Отправь текст сообщения')
    const flag = 'false'
    bot.on('text', (ctx) => {
        post(ctx.message.text, ctx.from.id, ctx, flag)
        ctx.deleteMessage(ctx.message.message_id)
    })
})


bot.launch()
console.log('Bot launched')