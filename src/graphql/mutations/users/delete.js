import User from '../../../schemas/users';
import { UserType, } from '../../types/user';
import * as GR from 'graphql';

export default {
    type: UserType,
    args: {
        id: {
            name: 'ID',
            type: new GR.GraphQLNonNull(GR.GraphQLID)
        }
    },
    resolve(root, params) {
        const deletedUser = User.findByIdAndDelete(params.id).exec()
        if(!deletedUser) throw new Error("Error on delete user")
        return deletedUser
    }
}