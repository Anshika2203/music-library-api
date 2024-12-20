import express from 'express';
import { getAllArtists, getArtist, addArtist, updateArtist, deleteArtist } from '../controllers/artist.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.get('/', getAllArtists);
router.get('/:id', getArtist);
router.post('/add-artist', authorize('Admin', 'Editor'), addArtist);
router.put('/:id', authorize('Admin', 'Editor'), updateArtist);
router.delete('/:id', authorize('Admin', 'Editor'), deleteArtist);

export default router;