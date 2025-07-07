import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import DBConnection from './database/db.js';
import User from './models/User.js';
import bcrypt from 'bcryptjs';//to encrypt passwords
import jwt from 'jsonwebtoken'; //to create tokens


const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8000;
DBConnection();
app.get('/', (req, res) => {
    res.send('API is running...');
});
app.use(cors({
    origin: 'http://localhost:5173', // your React dev server
    credentials: true
}));