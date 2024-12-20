import express from 'express';
import { getAllTracks, getTrack, addTrack, updateTrack, deleteTrack } from '../controllers/track.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.get('/', getAllTracks);
router.get('/:id', getTrack);
router.post('/add-track', authorize('Admin', 'Editor'), addTrack);
router.put('/:id', authorize('Admin', 'Editor'), updateTrack);
router.delete('/:id', authorize('Admin', 'Editor'), deleteTrack);

export default router;