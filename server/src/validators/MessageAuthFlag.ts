import { IsString } from "amala";

export default class MessageAuthFlag {
    @IsString()
    authFlag!: string
}