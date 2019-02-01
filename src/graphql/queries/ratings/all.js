import * as GRAPHQL from 'graphql';

import Rating from '../../../schemas/ratings';
import { RatingTypes } from  '../../types/ratings';

const queryAllRatings = {
    type: new GRAPHQL.GraphQLList(RatingTypes),
    resolve() {
        const ratings = Rating.find().exec()
        if(!ratings) throw new Error("Error at fetching ratings");
        return ratings;
    }
}

export default queryAllRatings;