import auth from "@/middleware/auth";
import { User } from "@/models/User";
import { encrypt } from "@/processors/crypto";
import { MessageModel } from "@/models/Message";
import MessageBody from "@/validators/MessageBody";
import { Body, Controller, CurrentUser, Flow, Get, Post } from "amala";

@Controller('/message')
@Flow(auth)
export default class MessageController {
    @Post('/')
    addMessage(
        @Body({ required: true }) { text }: MessageBody,
        @CurrentUser() author: User
    ) {
        const separator = '.000.'
        let [key, encryptedText, hashedKey] = encrypt(text)
        MessageModel.create({ author, encryptedText, hashedKey })
        let message = this.getLastMessage(author)
        let id = message._conditions.author._id.valueOf()
        key = key + separator + id
        return { key }
    }
    
    @Get('/')
    getMessage(@CurrentUser() author: User) {
        return MessageModel.find({ author })
    }

    @Get('/last')
    getLastMessage(
        @CurrentUser() author: User
    ) {
        return MessageModel.find({ author }).sort({ _id: -1}).limit(1)
    }
}