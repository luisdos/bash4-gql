import Movies from '../../../schemas/movies';
import { MovieType } from '../../types/movies';
import * as GR from 'graphql';

export default {
    type: MovieType,
    args: {
        id: {
            name: 'ID',
            type: new GR.GraphQLNonNull(GR.GraphQLID)
        }
    },
    resolve(root, params) {
        const deletedMovie = Movies.findByIdAndDelete(params.id).exec()
        if(!deletedMovie) throw new Error("Error on deleting movie")
        return deletedMovie
    }
}