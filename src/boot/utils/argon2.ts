import * as argon2 from "argon2";

export async function toHash(str: string) {
    try {
        const hash = await argon2.hash(str);
        return hash;
    } catch (e) {
        throw e;
    }
}

export async function verify(hash: string, str: string) {
    try {
        const isMatch = await argon2.verify(hash, str);
        return isMatch;
    } catch (e) {
        throw e;
    }
}