import { MessageModel } from "@/models/Message";
import { User } from "@/models/User";
import MessageBody from "@/validators/MessageBody";
import { Body, Controller, CurrentUser, Post } from "amala";

@Controller('/message')
export default class MessageController {
    @Post('/')
    addMessage(
        @Body({ required: true }) { text }: MessageBody,
        @CurrentUser() author: User
    ) {
        return MessageModel.create({ author, text })
    }
}