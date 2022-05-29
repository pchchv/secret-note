import { IsString } from "amala";

export default class MessageAuthor {
    @IsString()
    author!: string
}