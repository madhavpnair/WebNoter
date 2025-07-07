import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        default: null,
        required: true,
    },
    lastname: {
        type: String,
        default: null,
        required: true,
    },
    email: {
        type: String,
        default: null,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        default: null,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        default: null,
        required: true,
    }
});