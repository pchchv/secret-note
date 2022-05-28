import { MessageModel } from "@/models/Message";
import { User } from "@/models/User";

export async function postMessage(author: User, encryptedText: string, hashedKey: string) {
    return await MessageModel.create({ author, encryptedText, hashedKey })
}