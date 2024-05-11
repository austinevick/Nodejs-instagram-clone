import jwt from 'jsonwebtoken';



export const verifyToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            status: 401,
            message: 'Access denied'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(401).json({
            status: 401,
            message: 'Invalid token'
        });
    }
};


export const generateAccessToken = (user) => {
    return jwt.sign({ user: user }, process.env.JWT_SECRET);
};