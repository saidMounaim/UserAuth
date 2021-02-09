import User from '../models/UserModel.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';

// @DESC Create User
// @ROUTE /api/user
// @ACCESS PUBLIC
export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (!userExist) {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);
            const user = new User({ username, email, password: hashPassword });
            await user.save();
            res.status(201).json({ success: true, data: user });
        } else {
            res.status(401).json({ success: false, message: "Email already exist" });
        }
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
}

// @DESC Login User
// @ROUTE /api/login
// ACCESS PUBLIC
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (!userExist) {
            res.status(401).json({ success: false, message: "Email or password is wrong" });
        } else {
            const validPass = await bcrypt.compare(password, userExist.password);
            if (validPass) {
                const token = generateToken(userExist._id);
                res.status(201).json({ success: true, token: token });
                res.header("auth-token", token).send(token);
            } else {
                res.status(401).json({ success: false, message: "password not valid" });
            }
        }
    } catch (error) {
        res.status(401).json({ success: false, message: error.message });
    }
}