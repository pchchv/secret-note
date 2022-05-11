import { MEssageModel } from "@/models/Message";
import MessageBody from "@/validators/MessageBody";
import { Body, Controller, Post } from "amala";

@Controller('/message')
export default class MessageController {
    @Post('/')
    addMessage(
        @Body({ required: true }) { text }: MessageBody
    ) {
        return MEssageModel.create({ text })
    }
}