import 'module-alias/register'
import 'source-map-support/register'
import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';
import env from '@/helpers/env';

const bot: Telegraf<Context<Update>> = new Telegraf(env.TOKEN)

bot.start((ctx) => {
    ctx.reply('Привет ' + ctx.from.first_name + '!')
})

bot.launch()