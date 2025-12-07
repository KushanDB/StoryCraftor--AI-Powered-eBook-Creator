import express from 'express';
import { generateContent, generateOutline } from '../controllers/aiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate', protect, generateContent);
router.post('/outline', protect, generateOutline);

export default router;