import * as GRAPHQL from 'graphql';

export const RatingTypes = new GRAPHQL.GraphQLObjectType({
    name: "Ratings",
    description: "Ratings in database",
    fields: () => ({
        _id: {
            type: GRAPHQL.GraphQLNonNull(GRAPHQL.GraphQLID)
        },
        name: {
            type: GRAPHQL.GraphQLString
        },
        description: {
            type: GRAPHQL.GraphQLString
        },
        age: {
            type: GRAPHQL.GraphQLInt
        }
    })
})

export const RatingInputType = new GRAPHQL.GraphQLInputObjectType({
    name: "AddRatings",
    description: "Types of add ratings",
    fields: () => ({
        name: {
            type: GRAPHQL.GraphQLString
        },
        description: {
            type: GRAPHQL.GraphQLString
        },
        age: {
            type: GRAPHQL.GraphQLInt
        }
    })
})