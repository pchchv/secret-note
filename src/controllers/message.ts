import { MessageModel } from "@/models/Message";
import MessageBody from "@/validators/MessageBody";
import { Body, Controller, Post } from "amala";

@Controller('/message')
export default class MessageController {
    @Post('/')
    addMessage(
        @Body({ required: true }) { text }: MessageBody
    ) {
        return MessageModel.create({ text })
    }
}