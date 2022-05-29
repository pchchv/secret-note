import { getModelForClass, modelOptions, prop} from '@typegoose/typegoose'

@modelOptions({ schemaOptions: { timestamps: true }})
export class Message {
    @prop({ required: false })
    author!: string
    
    @prop({ required: true})
    encryptedText!: string

    @prop({ required: true})
    hashedKey!: string
}

export const MessageModel = getModelForClass(Message)