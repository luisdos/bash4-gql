import * as GRAPHQL from 'graphql';

import Rating from '../../../schemas/ratings';
import { RatingTypes } from  '../../types/ratings';

const querySingleRating = {
    type: RatingTypes,
    args: {
        id: {
            name: 'ID',
            type: GRAPHQL.GraphQLNonNull(GRAPHQL.GraphQLID)
        }
    },
    resolve(root, params) {
        const rating = Rating.findById(params.id).exec()
        return rating;
    }
}

export default querySingleRating;