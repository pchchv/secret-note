import { MessageModel } from "@/models/Message";

export async function postMessage(author: string, encryptedText: string, hashedKey: string, authFlag: string) {
    return await MessageModel.create({ author, encryptedText, hashedKey, authFlag })
}