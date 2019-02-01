import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RatingsSchema = new Schema({
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
}, { 'collection': 'ratings', timestamps: true } );

export default mongoose.model('ratings', RatingsSchema)