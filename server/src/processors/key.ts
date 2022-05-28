import { sha512 } from 'hash.js'

export function getKey() {
    let key = ''
    while (key.length < 33) {
        key += Math.random().toString(36).substring(2)
    }
    return key
}

export function getHashedKey(key: string) {
    return sha512().update(key).digest('hex')
}

export function checkKey(key: string, hashedKey: string) {
    if (hashedKey === getHashedKey(key)){
        return true
    } else {
        return false
    }
}