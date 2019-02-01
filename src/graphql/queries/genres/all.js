import * as GRAPHQL from 'graphql';

import Genre from '../../../schemas/genres';
import { GenreTypes } from  '../../types/genres';

const queryAllGenres = {
    type: new GRAPHQL.GraphQLList(GenreTypes),
    resolve() {
        const genres = Genre.find().exec()
        if(!genres) throw new Error("Error at fetching genres");
        return genres;
    }
}

export default queryAllGenres;