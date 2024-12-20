import express from 'express';
import { getAllUsers, addUser, deleteUser, updatePassword } from '../controllers/user.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.get('/', authorize('Admin'), getAllUsers);
router.post('/add-user', authorize('Admin'), addUser);
router.delete('/:id', authorize('Admin'), deleteUser);
router.put('/update-password', updatePassword);

export default router;