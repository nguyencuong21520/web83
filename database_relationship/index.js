import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from './models/user.js';
import { SecretKey, validateToken } from './middlewares/token.js';
import PostModel from './models/post.js';
await mongoose.connect('mongodb://localhost:27017/web82');
const app = express();
app.use(express.json());

// api đăng nhập, đăng ký cơ bản kết hợp bcrypt, jwt

app.post('/register', async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!email || !password) throw new Error('Email or password is missing!');
        const hashedPassword = bcrypt.hashSync(password, 10);
        const createdUser = await UserModel.create({
            email,
            password: hashedPassword,
            userName
        });
        res.status(201).send({
            message: 'Register successful!',
            data: createdUser
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
            data: null
        });
    }
});

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) throw new Error('Email or password is missing!');
        const currentUser = await UserModel.findOne({
            email
        });
        if (!currentUser) throw new Error('Email or password is invalid!');
        const comparedPassword = bcrypt.compareSync(password, currentUser.password);
        if (!comparedPassword) throw new Error('Email or password is invalid!');
        const user = {
            _id: currentUser._id,
            email: currentUser.email
        }
        const accessToken = jwt.sign(user, SecretKey, {
            expiresIn: 60 * 5
        });
        res.status(200).send({
            message: 'Login successful!',
            data: accessToken
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
            data: null
        });
    }
});

// API tạo bài post: mỗi khi tạo bài post, cần phải gửi được accessToken lên cho server kiểm tra
/***
 * 
 * -> Phải đăng nhập vào đã
 * cái gì thể hiện đã đăng nhập vào rồi?  => token (accessToken)
 * 
 */
app.post('/posts', validateToken, async (req, res) => {
    try {
        // tạo bài post
        const { content } = req.body;
        const user = req.user;
        if (!content) throw new Error('Content is required!');
        const createdPost = await PostModel.create({
            content,
            userId: user._id
        });
        res.status(201).send({
            message: 'Created post!',
            data: createdPost
        });
    } catch (error) {
        res.status(400).send({
            message: error.message,
            data: null
        });
    }
});
// API lấy tất cả các bài post,
// phải kèm theo lấy thông tin tác giả của bài post

app.get('/posts', async (req, res) => {
    const listPost = await PostModel.find().populate('userId', '_id userName email');
    res.status(200).send({
        message: 'Successful!',
        data: listPost
    })
});
// api cập nhật bài post
// chỉ có người tạo mới được cập nhật
app.put('/posts/:id', validateToken, async (req, res) => {
    try {
        const { user } = req;
        const { id } = req.params;
        const { content } = req.body;
        const currentPost = await PostModel.findById(id);
        if (!currentPost) throw new Error('This post is not exist!');
        if (user._id !== currentPost.userId.toString()) throw new Error('Permission denined!');

        currentPost.content = content;

        await currentPost.save({
            timestamps: true
        });
        res.status(201).send({
            message: 'Updated post!',
            data: currentPost
        });
    } catch (error) {
        res.status(400).send({
            message: error.message
        });
    }
});

app.listen(8000, () => {
    console.log('Server is running!');
});