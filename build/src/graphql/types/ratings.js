"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RatingInputType = exports.RatingTypes = undefined;

var _graphql = require("graphql");

var GRAPHQL = _interopRequireWildcard(_graphql);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var RatingTypes = exports.RatingTypes = new GRAPHQL.GraphQLObjectType({
    name: "Ratings",
    description: "Ratings in database",
    fields: function fields() {
        return {
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
        };
    }
});

var RatingInputType = exports.RatingInputType = new GRAPHQL.GraphQLInputObjectType({
    name: "AddRatings",
    description: "Types of add ratings",
    fields: function fields() {
        return {
            name: {
                type: GRAPHQL.GraphQLString
            },
            description: {
                type: GRAPHQL.GraphQLString
            },
            age: {
                type: GRAPHQL.GraphQLInt
            }
        };
    }
});