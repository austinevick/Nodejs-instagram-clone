import User from '../model/UserModel.js';
import bcrypt from 'bcrypt';
import { generateAccessToken } from '../middleware/ProtectRoute.js';
import { handleFileUpload } from '../utils/handleFileUpload.js';


export const register = async (req, res) => {
    try {
        const { username, firstName, gender, location,
            lastName, email, password } = req.body;
        console.log(req.file.path, req.body);
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(200).json({
                status: 200,
                message: 'user already exist'
            });
        } else {
            const result = await handleFileUpload(req.file.path, "image");

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = new User({
                username: username,
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                email: email,
                location: location,
                imageUrl: result.url,
                password: hashedPassword
            });
            const userData = (await user.save());
            const data = await User.findOne(userData).select('-password');
            const token = generateAccessToken(data);
            return res.status(201).json({
                status: 201,
                message: 'user created successfully',
                data: data,
                token: token
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

export const checkIfUsernameExist = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await User.findOne(
            { username: username });
        if (user) return res.status(400).json({
            status: 400,
            message: `${ username } already taken`
        });
        return res.status(200).json({
            status: 200,
            message: `${ username } is available`
        });
    } catch (error) {
        return res.status(400).json({
            status: 400,
            message: error.message
        });
    }
};

export const login = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ username: username, email: email });
        if (!existingUser) {
            return res.status(400).json({
                status: 400,
                message: 'User doesn\'t exist or account has been deleted'
            });
        } else {
            const passwordMatch = await bcrypt.compare(password, existingUser.password);
            if (!passwordMatch) {
                return res.status(401).json({
                    status: 401,
                    message: 'Invalid username or password'
                });
            }
        }
        const data = await User.findById(existingUser._id).select('-password');
        const token = generateAccessToken(data);
        return res.status(200).json({
            status: 200,
            message: 'User account found',
            data: data,
            token: token
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};


