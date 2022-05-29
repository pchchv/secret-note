import {
    Get,
    Body,
    Post,
    Flow,
    State,
    Delete,
    Controller,
    Header,
} from "amala";
import { decrypt, encrypt } from "@/processors/crypto";
import MessageBody from "@/validators/MessageBody";
import checkAuthor from "@/middleware/checkAuthor";
import { DocumentType } from "@typegoose/typegoose";
import { Message } from "@/models/Message";
import { postMessage } from "@/helpers/postMessage";
import MessageAuthor from "@/validators/MessageAuthor";
import MessageAuthFlag from "@/validators/MessageAuthFlag";

@Controller('/message')
export default class MessageController {
    @Post('/')
    async addMessage(
        @Body({ required: true }) { author }: MessageAuthor,
        @Body({ required: true }) { text }: MessageBody,
        @Body({ required: true }) { authFlag }: MessageAuthFlag
    ) {
        const separator = '.0.'
        let [key, encryptedText, hashedKey] = encrypt(text)
        const message = postMessage(author, encryptedText, hashedKey, authFlag)
        const id = (await message)._id.valueOf()
        key = key + separator + id
        return { key }
    }
    
    @Delete('/:userKey/:user/')
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