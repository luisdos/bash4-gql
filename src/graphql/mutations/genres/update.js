import Genre from '../../../schemas/genres';
import { GenreTypes, GenreInputType } from '../../types/genres';
import * as GR from 'graphql';

export default {
    type: GenreTypes,
    args: {
        id: {
            name: 'ID',
            type: new GR.GraphQLNonNull(GR.GraphQLID)
        },
        data: {
            name: 'data',
            type: new GR.GraphQLNonNull(GenreInputType)
        }
    },
    resolve(root, params) {
        return Genre.findByIdAndUpdate(params.id, { $set: { ...params.data } })
            .then(genre => Genre.findById(genre.id).exec())
            .catch(err => new Error("Couldn't update genre", err))
    }
}