import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    const token = jwt.sign({ id }, process.env.TOKEN_VERIFY);
    return token;
}

export default generateToken;