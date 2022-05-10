import { getKey, checkKey } from './key'
var ncrypt = require('ncrypt-js')

export function encrypt(text: string): string[] {
    let key = getKey()
    let ncryptObject = new ncrypt(key)
    let encryptedText = ncryptObject.encrypt(text)
    return [key, encryptedText]

}
export function decrypt(encryptedText: string, key: string, hashedKey: string): string { 
    if (checkKey(key, hashedKey)) {
        let ncryptObject = new ncrypt(key)
        return ncryptObject.decrypt(encryptedText)
    }
    else {
        return 'Error! Invalid key.'
    }
}