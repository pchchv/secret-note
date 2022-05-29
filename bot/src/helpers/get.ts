import axios from "axios";
import env from "@/helpers/env";
import { Context } from "telegraf";

export function get(key: string, user: number, ctx: Context) {
    const url = 'http://' + env.URL + '/message/' + key + '/' + user
    axios.delete(url).then(resp => {
        console.log(resp.data.result)
        ctx.reply(resp.data.result)
    })
}