import User from '../../../schemas/users';
import { UserType, UserInputType } from '../../types/user';
import * as GR from 'graphql';

export default {
    type: UserType,
    args: {
        data: {
            name: 'data',
            type: new GR.GraphQLNonNull(UserInputType)
        }
    },
    resolve(root, params) {
        const user = new User(params.data)
        const newUser = user.save()
        if(!newUser) throw new Error("Error ar creating user")
        return newUser
    }
}