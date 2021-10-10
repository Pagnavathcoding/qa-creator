import mongoose from 'mongoose';
const PostSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: false
    },
    question: {
        type: String,
        required: true,
        unique: true
    },
    answer: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: String,
        default: new Date()
    }
});

export default mongoose.model('Post', PostSchema);