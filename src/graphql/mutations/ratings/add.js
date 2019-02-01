import Rating from '../../../schemas/ratings';
import { RatingTypes, RatingInputType } from '../../types/ratings';
import * as GR from 'graphql';

export default {
    type: RatingTypes,
    args: {
        data: {
            name: 'data',
            type: new GR.GraphQLNonNull(RatingInputType)
        }
    },
    resolve(root, params) {
        const rating = new Rating(params.data)
        const newRating = rating.save()
        if(!newRating) throw new Error("Error at creating rating")
        return newRating
    }
}