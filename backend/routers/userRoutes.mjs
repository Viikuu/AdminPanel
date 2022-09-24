import {Router} from 'express';
import {
	allusers,
	blockUsers,
	deleteUsers,
	login,
	logout,
	register,
	unBlockUsers,
	user,
} from '../controlers/usersController.mjs';
import {authenticateToken} from '../middleware/authMiddleware.mjs';

const userRoutes = Router();

userRoutes.post('/register', register);
userRoutes.post('/login', login);
userRoutes.get('/', authenticateToken, user);
userRoutes.get('/allusers', authenticateToken, allusers);
userRoutes.put('/blockusers', authenticateToken, blockUsers);
userRoutes.put('/unblockusers', authenticateToken, unBlockUsers);
userRoutes.get('/logout', authenticateToken, logout);
userRoutes.post('/', authenticateToken, deleteUsers);

export {
	userRoutes,
};
