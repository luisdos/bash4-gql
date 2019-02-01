'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SALT_WORK_FACTOR = 10;
var Schema = _mongoose2.default.Schema;

var UserSchema = new Schema({
    'name': {
        type: String,
        required: true
    },
    'lastName': {
        type: String,
        required: true
    },
    'email': {
        type: String,
        required: true
    },
    'password': {
        type: String,
        required: true
    }
}, { 'collection': 'users', timestamps: true });

UserSchema.pre('save', function (next) {
    var user = this;

    // SOLO MODIFICAMOS DE NUEVO LA CONTRASEÑA SI SE HA MODIFICADO O ES NUEVA
    if (!user.isModified('password')) return next();

    _bcrypt2.default.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        // HASHEAMOS LA CONTRASEÑA UTILIZANDO EL SALT GENERADO
        _bcrypt2.default.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // SOBREESCRIBIMOS CONTRASEÑA
            user.password = hash;
            console.log(user.password);
            next();
        });
    });
});

exports.default = _mongoose2.default.model('users', UserSchema);