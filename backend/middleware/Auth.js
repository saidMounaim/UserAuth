import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).json({ success: false, message: "Access Denied" });
    }
    try {
        const verfied = jwt.verify(token, process.env.TOKEN_VERIFY);
        req.user = verfied;
        next();
    } catch (error) {
        res.status(401).send("Invalid token");
    }
}

export default verifyToken;