import crypto from "crypto";

export function generateUniqueHash(length: number): string {
    const hash = crypto.createHash('sha256').update(crypto.randomBytes(32)).digest('hex');
    
    return hash.slice(0, length);
}