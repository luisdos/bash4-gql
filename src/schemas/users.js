import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    'name': {
        type: String,
        required: true
    },
    'lastName' : {
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
}, {'collection': 'users', timestamps: true});

UserSchema.pre('save', function(next) {
    var user = this;

    // SOLO MODIFICAMOS DE NUEVO LA CONTRASEÑA SI SE HA MODIFICADO O ES NUEVA
    if(!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) return next(err);
        // HASHEAMOS LA CONTRASEÑA UTILIZANDO EL SALT GENERADO
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);

            // SOBREESCRIBIMOS CONTRASEÑA
            user.password = hash;
            console.log(user.password)
            next();
        })
    })
})

export default mongoose.model('users', UserSchema);
