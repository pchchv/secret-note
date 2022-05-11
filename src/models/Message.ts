import { getModelForClass, prop } from '@typegoose/typegoose'

export class Message {
    @prop({ required: true})
    text!: string
}

export const MEssageModel = getModelForClass(Message)