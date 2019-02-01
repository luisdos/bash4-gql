import Movies from '../../../schemas/movies';
import { MovieType, MovieInputType } from '../../types/movies';
import * as GR from 'graphql';

export default {
    type: MovieType,
    args: {
        id: {
            name: 'ID',
            type: new GR.GraphQLNonNull(GR.GraphQLID)
        },
        data: {
            name: 'data',
            type: new GR.GraphQLNonNull(MovieInputType)
        }
    },
    resolve(root, params) {
        return Movies.findByIdAndUpdate(params.id, { $set: { ...params.data } })
            .then(movie => Movies.findById(movie.id).exec())
            .catch(err => new Error("Couldn't update movie", err))
    }
}