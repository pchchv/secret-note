import { getKey, getHashedKey, checkKey} from './processors/key'

let key = getKey()
let hashedKey = getHashedKey(key)
console.log(`Your key: ${key}`)
console.log(`Hash: ${hashedKey}`)
if (checkKey(key, hashedKey)) {
    console.log('Right key')
} else {
    console.log('Your key is invalid')
}