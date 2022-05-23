import auth from "@/middleware/auth";
import { MessageModel } from "@/models/Message";
import { User } from "@/models/User";
import { encrypt } from "@/processors/crypto";
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
        let [key, encryptedText, hashedKey] = encrypt(text)
        MessageModel.create({ author, encryptedText, hashedKey })
        return { key }
    }

    @Get('/')
    getMessage(@CurrentUser() author: User) {
        return MessageModel.find({ author })
    }
}