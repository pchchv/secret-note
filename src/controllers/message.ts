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
import { decrypt, encrypt } from "@/processors/crypto";
import MessageBody from "@/validators/MessageBody";
import checkAuthor from "@/middleware/checkAuthor";
import { DocumentType } from "@typegoose/typegoose";
import { Message, MessageModel } from "@/models/Message";
import { postMessage } from "@/helpers/postMessage";

@Controller('/message')
@Flow(auth)
export default class MessageController {
    @Post('/')
    async addMessage(
        @Body({ required: true }) { text }: MessageBody,
        @CurrentUser() author: User
    ) {
        const separator = '.0.'
        let [key, encryptedText, hashedKey] = encrypt(text)
        const message = postMessage(author, encryptedText, hashedKey)
        const id = (await message)._id.valueOf()
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

    @Delete('/:userKey/:flag')
    @Flow(checkAuthor)
    deleteMessage(
        @State('key') key: string,
        @State('message') message: DocumentType<Message>
        ) {
            let result = decrypt(message.encryptedText, key, message.hashedKey)
            if (result != 'Error! Invalid key.') {
                message.deleteOne()
            }
            return { result }
        }
}