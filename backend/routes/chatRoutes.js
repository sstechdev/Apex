import express from 'express';
import { chatResponse, getConversations, getConversation } from '../controllers/chatController.js';

const router = express.Router();

router.post('/chat', chatResponse);
router.get('/conversations', getConversations);
router.get('/conversation/:id', getConversation);

export default router;