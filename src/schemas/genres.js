import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const GenreSchema = new Schema({
    'name': {
        type: String,
        required: true
    },
    'description': {
        type: String,
        required: true
    }
}, {'collection': 'genres', timestamps: true});

export default mongoose.model('genres', GenreSchema)