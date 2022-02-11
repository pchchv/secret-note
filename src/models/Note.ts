import { getModelForClass, prop } from "@typegoose/typegoose"

export class Note {
    @prop({ required: true})
    hashedKey!: string
    @prop({ required: true })
    encryptedText!: string
}

export const MessageModel = getModelForClass(Note)