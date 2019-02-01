import Genres from '../../../schemas/genres';
import { GenreTypes, GenreInputType } from '../../types/genres';
import * as GR from 'graphql';

export default {
    type: GenreTypes,
    args: {
        data: {
            name: 'data',
            type: new GR.GraphQLNonNull(GenreInputType)
        }
    },
    resolve(root, params) {
        const genre = new Genres(params.data)
        const newGenre = genre.save()
        if(!newGenre) throw new Error("Error at creating genre")
        return newGenre
    }
}