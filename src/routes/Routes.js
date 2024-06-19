import express from 'express';
import multer from 'multer';
import { checkIfUsernameExist, login, register } from '../controller/AuthController.js';
import { loginValidation, registerValidation } from '../middleware/SchemaValidation.js';
import { createPost, getPosts, handleLikes, handleUnLikes } from '../controller/PostController.js';
import { createComment, deleteComment, getCommentByPostId } from '../controller/commentController.js';
import { followUser, getAllUsers, getProfileById, unfollowUser } from '../controller/ProfileController.js';
import { verifyToken } from '../middleware/ProtectRoute.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) { return cb(null, "./uploads"); },
    filename: function (req, file, callback) {
        return callback(null, `${ Date.now() }_${ file.originalname }`);
    }
});

const upload = multer({ storage });

///Authentication
router.post('/user/register', upload.single("imageUrl"), registerValidation, register);
router.post('/user/login', loginValidation, login);
router.get('/user/register/:username', checkIfUsernameExist);

///Post
router.post('/post/create', verifyToken, upload.single("media"), createPost);
router.get('/post/all', getPosts);
router.patch('/post/like/:postId', handleLikes);
router.patch('/post/unLike/:postId', handleUnLikes);

///Comments
router.post('/comment/create', createComment);
router.delete('/comment/delete/:id', deleteComment);
router.get('/comment/all/:id', getCommentByPostId);

/// Profile
router.get('/user/all', getAllUsers);
router.get('/user/profile/:id', getProfileById);
router.post('/user/follow', verifyToken, followUser);
router.post('/user/unfollow', verifyToken, unfollowUser);


export default router;