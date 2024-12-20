import express from 'express';
import { getFavorites, addFavorite, removeFavorite } from '../controllers/favorite.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.get('/:category', getFavorites);
router.post('/add-favorite', addFavorite);
router.delete('/remove-favorite/:id', removeFavorite);

export default router;