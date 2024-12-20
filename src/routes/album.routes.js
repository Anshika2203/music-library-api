import express from 'express';
import { getAllAlbums, getAlbum, addAlbum, updateAlbum, deleteAlbum } from '../controllers/album.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.get('/', getAllAlbums);
router.get('/:id', getAlbum);
router.post('/add-album', authorize('Admin', 'Editor'), addAlbum);
router.put('/:id', authorize('Admin', 'Editor'), updateAlbum);
router.delete('/:id', authorize('Admin', 'Editor'), deleteAlbum);

export default router;