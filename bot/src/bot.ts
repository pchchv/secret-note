import 'module-alias/register'
import 'source-map-support/register'
import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';
import env from '@/helpers/env';

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


bot.launch()
console.log('Bot launched')