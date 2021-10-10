import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Post from './Models/Post.js';
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
const DB_CONNECTION = "mongodb+srv://Pagnavath_Sok:pagnavathqacreator2021@cluster0.xijkj.mongodb.net/QAcreator?retryWrites=true&w=majority";
mongoose.connect(DB_CONNECTION).then(() => {
    console.log(`MongoDB connected...`);
})
app.get('/api/post', (req, res) => {
    Post.find().then((data) => {
        return res.json(data)
    })
})
app.post('/api/post', (req, res) => {
    const newPost = new Post({
        name: req.body.name,
        question: req.body.question,
        answer: req.body.answer
    });
    newPost.save().then((data) => {
        return res.json(data)
    });
});
app.delete('/api/post/:id', (req, res) => {
    Post.findById(req.params.id).then((data) => {
        return data.remove().then(() => {
            return res.status(200).json({
                deleted: true
            })
        }).catch(() => {
            return res.status(400).json({
                deleted: false
            })
        })
    })
});
app.listen(port, () => {
    console.log(`Server running on port http://localhost:${port}`);
});