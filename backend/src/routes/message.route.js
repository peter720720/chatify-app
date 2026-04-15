import express from 'express';
import { getAllContacts } from '../controllers/message.controller.js';
import { getMessagesByUserId } from '../controllers/message.controller.js';
import { sendMessage } from '../controllers/message.controller.js';
import { getChatsPartners } from '../controllers/message.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';
import { arcjetProtection } from '../middleware/arcjet.middleware.js';

const router = express.Router();



router.use(arcjetProtection, protectRoute);

router.get("/contacts",  getAllContacts);
router.get("/chats",  getChatsPartners);
router.get("/:id",  getMessagesByUserId);
router.post("/send/:id",  sendMessage);

export default router;