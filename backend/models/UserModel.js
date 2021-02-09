import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 10,
    },
    email: {
        type: String,
        max: 100,
        match: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model("User", UserSchema);

export default User;