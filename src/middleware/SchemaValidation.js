import Joi from 'joi';
import jwt from 'jsonwebtoken';

////REGISTER VALIDATION
const registerSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().min(6).required(),
});

export const registerValidation = (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            statusCode: 400,
            message: error.details[0].message
        });
    }
    next();
};


////LOGIN VALIDATION
const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

export const loginValidation = (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            statusCode: 400,
            message: error.details[0].message
        });
    }
    next();
};


////VALIDATE TOKEN
export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            statusCode: 401,
            error: 'Access denied'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        return res.status(401).json({
            statusCode: 401,
            error: 'Invalid token'
        });
    }
};

///SIGN JWT
export const signToken = (userId) => {
    return jwt.sign({ userId: userId }, process.env.JWT_SECRET,
        { expiresIn: '1h' });
};