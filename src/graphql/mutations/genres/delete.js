import Genres from '../../../schemas/genres';
import { GenreTypes } from '../../types/genres';
import * as GR from 'graphql';

export default {
    type: GenreTypes,
    args: {
        id: {
            name: 'ID',
            type: new GR.GraphQLNonNull(GR.GraphQLID)
        }
    },
    resolve(root, params) {
        const deletedGenre = Genres.findByIdAndDelete(params.id).exec()
        if(!deletedGenre) throw new Error("Error on deleting genre")
        return deletedGenre
    }
}