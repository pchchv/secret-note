import { getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose'
import { User } from '@/models/User'

@modelOptions({ schemaOptions: { timestamps: true }})
export class Message {
    @prop({ ref: () => User, required: true })
    author!: Ref<User>
    
    @prop({ required: true})
    encryptedText!: string

    @prop({ required: true})
    hashedKey!: string
}

export const MessageModel = getModelForClass(Message)