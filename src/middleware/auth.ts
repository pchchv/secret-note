import { verify } from "@/helpers/jwt";
import { UserModel } from "@/models/User";
import { forbidden, notFound } from "@hapi/boom";
import { Context, Next } from "koa";

export default async function auth(ctx: Context, next: Next) {
    const token = ctx.header.token as string
    try {
        await verify(token)
    } catch (err) {
        return ctx.throw(forbidden())
    }
    ctx.state.user = await UserModel.findOne({ token })
    if (!ctx.state.user) {
        return ctx.throw(notFound())
    }
    return next()
}