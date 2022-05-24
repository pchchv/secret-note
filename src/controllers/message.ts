import {
    Get,
    Body,
    Post,
    Flow,
    State,
    Delete,
    Controller,
    CurrentUser,
} from "amala";
import auth from "@/middleware/auth";
import { User } from "@/models/User";
import { encrypt } from "@/processors/crypto";
import MessageBody from "@/validators/MessageBody";
import checkAuthor from "@/middleware/checkAuthor";
import { DocumentType } from "@typegoose/typegoose";
import { Message, MessageModel } from "@/models/Message";

@Controller('/message')
@Flow(auth)
export default class MessageController {
    @Post('/')
    addMessage(
        @Body({ required: true }) { text }: MessageBody,
        @CurrentUser() author: User
    ) {
        const separator = '.0.'
        let [key, encryptedText, hashedKey] = encrypt(text)
        MessageModel.create({ author, encryptedText, hashedKey })
        let message = this.getLastMessage(author)
        let id = message._conditions.author._id.valueOf()
        let userKey = key + separator + id
        return { userKey }
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

    @Delete('/:id/:flag')
    @Flow(checkAuthor)
    deleteMessage(@State('message') message: DocumentType<Message>) {
        return message.deleteOne()
    }
}