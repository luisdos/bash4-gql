'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var RatingsSchema = new Schema({
    'name': {
        type: String,
        required: true
    },
    'description': {
        type: String,
        required: true
    },
    'age': {
        type: Number,
        required: true
    }
}, { 'collection': 'ratings', timestamps: true });

exports.default = _mongoose2.default.model('ratings', RatingsSchema);