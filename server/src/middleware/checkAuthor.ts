import { Context, Next } from 'koa'
import { MessageModel } from '@/models/Message'
import { notFound } from '@hapi/boom'

export default async function checkAuthor(ctx: Context, next: Next) {
    const [key, id] = ctx.params.userKey.split('.0.')
    try {
        const message = await MessageModel.findById(id)
        if (message?.authFlag === "true") {
            if (message?.author?.toString() != ctx.params.user) {
                throw 'Error'
            }
        }
        ctx.state.key = key
        ctx.state.message = message
        return next()
    } catch {
        return ctx.throw(notFound())
    }
}