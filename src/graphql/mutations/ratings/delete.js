import Rating from '../../../schemas/ratings';
import { RatingTypes } from '../../types/ratings';
import * as GR from 'graphql';

export default {
    type: RatingTypes,
    args: {
        id: {
            name: 'ID',
            type: new GR.GraphQLNonNull(GR.GraphQLID)
        }
    },
    resolve(root, params) {
        const deletedRating = Rating.findByIdAndDelete(params.id).exec()
        if(!deletedRating) throw new Error("Error on deleting rating")
        return deletedRating
    }
}