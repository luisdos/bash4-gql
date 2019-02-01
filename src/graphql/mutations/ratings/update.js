import Rating from '../../../schemas/ratings';
import { RatingTypes, RatingInputType } from '../../types/ratings';
import * as GR from 'graphql';

export default {
    type: RatingTypes,
    args: {
        id: {
            name: 'ID',
            type: new GR.GraphQLNonNull(GR.GraphQLID)
        },
        data: {
            name: 'data',
            type: new GR.GraphQLNonNull(RatingInputType)
        }
    },
    resolve(root, params) {
        return Rating.findByIdAndUpdate(params.id, { $set: { ...params.data } })
            .then(rating => Rating.findById(rating.id).exec())
            .catch(err => new Error("Couldn't update rating", err))
    }
}