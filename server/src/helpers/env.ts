import { cleanEnv, num, str } from 'envalid'
import * as dotenv from 'dotenv'
import { resolve } from 'path'
import { cwd } from 'process'

dotenv.config({ path: resolve(cwd(), '.env') })

// eslint-disable-next-line node/no-process-env
export default cleanEnv(process.env, {
    PORT: num({ default: 1337 }),
    JWT: str(),
    MONGO: str(),
  })