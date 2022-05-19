import auth from "@/middleware/auth";
import { MessageModel } from "@/models/Message";
import { User } from "@/models/User";
import MessageBody from "@/validators/MessageBody";
import { Body, Controller, CurrentUser, Flow, Post } from "amala";

@Controller('/message')
@Flow(auth)
export default class MessageController {
    @Post('/')
    addMessage(
        @Body({ required: true }) { text }: MessageBody,
        @CurrentUser() author: User
    ) {
        return MessageModel.create({ author, text })
    }
}