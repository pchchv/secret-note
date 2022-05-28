import { findOrCreateUser } from "@/models/User";
import EmailLogin from "@/validators/EmailLogin";
import { Body, Controller, Post } from "amala";

@Controller('/login')
export default class LoginController {
    @Post('/email')
    async email(@Body({ required: true }) { name, email }: EmailLogin) {
        const user = await findOrCreateUser({ name, email })
        return user.strippedAndFilled({ withExtra: true })
    }
}