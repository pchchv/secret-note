import axios from "axios"
import env from "@/helpers/env"
import { Context } from "telegraf"

export function post(text: string, user: number, ctx: Context) {
    const url = 'http://' + env.URL + '/message'
    axios.post(url, { text: text, author: String(user) }).then(resp => {
        ctx.reply('Твой ключ для получения сообщения — ' + resp.data.key)
    })
}