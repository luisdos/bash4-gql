'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _genres = require('../../../schemas/genres');

var _genres2 = _interopRequireDefault(_genres);

var _genres3 = require('../../types/genres');

var _graphql = require('graphql');

var GR = _interopRequireWildcard(_graphql);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    type: _genres3.GenreTypes,
    args: {
        id: {
            name: 'ID',
            type: new GR.GraphQLNonNull(GR.GraphQLID)
        }
    },
    resolve: function resolve(root, params) {
        var deletedGenre = _genres2.default.findByIdAndDelete(params.id).exec();
        if (!deletedGenre) throw new Error("Error on deleting genre");
        return deletedGenre;
    }
};