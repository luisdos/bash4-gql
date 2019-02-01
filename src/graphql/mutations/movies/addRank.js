import * as GR from 'graphql';
import Movies from '../../../schemas/movies';
import { RankMovieType, MovieType } from '../../types/movies';

export default {
    type: MovieType,
    args: {
        id: {
            name: 'ID',
            type: GR.GraphQLNonNull(GR.GraphQLID)
        },
        data: {
            name: 'data',
            type: GR.GraphQLNonNull(RankMovieType)
        }
    }, resolve(root, params) {
        const { id, data } = params
        return Movies.findByIdAndUpdate(id, { $push: { rank: data.rank } })
               .then(movie => {
                   return Movies.findById(movie.id).exec()
               })
    }
}