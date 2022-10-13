const express = require('express');
const router = express.Router();
const { getMessages, setMessage, updateMessage , deleteMessage, like, unlike, comment } = require('../controllers/messageController');
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(getMessages).post(protect, setMessage);
router.route('/:id').put(protect, updateMessage).delete(protect, deleteMessage);
router.route('/like/:id').put(protect, like)
router.route('/unlike/:id').put(protect, unlike)
router.route('/comment/:id').put(protect, comment)

module.exports = router;