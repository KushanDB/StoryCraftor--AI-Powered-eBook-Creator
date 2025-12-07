import express from 'express';
import {
  createEbook,
  getUserEbooks,
  getEbookById,
  updateEbook,
  deleteEbook,
  addChapter,
  updateChapter,
  deleteChapter,
} from '../controllers/ebookController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// eBook routes
router.route('/').post(protect, createEbook).get(protect, getUserEbooks);
router
  .route('/:id')
  .get(protect, getEbookById)
  .put(protect, updateEbook)
  .delete(protect, deleteEbook);

// Chapter routes
router.route('/:id/chapters').post(protect, addChapter);
router
  .route('/:id/chapters/:chapterId')
  .put(protect, updateChapter)
  .delete(protect, deleteChapter);

export default router;