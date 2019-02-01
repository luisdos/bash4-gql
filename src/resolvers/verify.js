import User from '../schemas/users';
import jwt from 'jsonwebtoken';
import { rejects } from 'assert';

const secret = 'hola_mi_nombre_es_Luis';
const prefixToken = 'JWT';

export const verifyToken = (token) => {
    const [prefix, payload] = token.split(' ')
    let user = null
    if(!payload) {
        throw new Error('No Token Provided')
    }
    if(prefix !== prefixToken) {
        throw new Error('Invalid header format')
    }

    jwt.verify(payload, secret, (err, data) => {
        if(err) {
            throw new Error('Invalid token')
        } else {
            console.log("Email del payload", data.email);
            user = User.findOne({'email': data.email})
        }
    })
    
    if(!user) {
        throw new Error('User does not exist in database')
    }

    return user
}