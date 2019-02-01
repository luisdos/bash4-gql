'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.verifyToken = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _users = require('../schemas/users');

var _users2 = _interopRequireDefault(_users);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _assert = require('assert');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secret = 'hola_mi_nombre_es_Luis';
var prefixToken = 'JWT';

var verifyToken = exports.verifyToken = function verifyToken(token) {
    var _token$split = token.split(' '),
        _token$split2 = _slicedToArray(_token$split, 2),
        prefix = _token$split2[0],
        payload = _token$split2[1];

    var user = null;
    if (!payload) {
        throw new Error('No Token Provided');
    }
    if (prefix !== prefixToken) {
        throw new Error('Invalid header format');
    }

    _jsonwebtoken2.default.verify(payload, secret, function (err, data) {
        if (err) {
            throw new Error('Invalid token');
        } else {
            console.log("Email del payload", data.email);
            user = _users2.default.findOne({ 'email': data.email });
        }
    });

    if (!user) {
        throw new Error('User does not exist in database');
    }

    return user;
};