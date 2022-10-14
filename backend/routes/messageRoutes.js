const express = require('express');
const router = express.Router();
const { getMessages, setMessage, updateMessage , deleteMessage, like, unlike, comment, userMessages } = require('../controllers/messageController');
const {protect} = require('../middleware/authMiddleware')
const {upload} = require('../controllers/messageController')

router.route('/').get(getMessages).post(protect, upload.single('image'), setMessage);
router.route('/:id').put(protect, updateMessage).delete(protect, deleteMessage);
router.route('/like/:id').put(protect, like)
router.route('/unlike/:id').put(protect, unlike)
router.route('/comment/:id').put(protect, comment)
router.route('/myposts/:id').get(protect, userMessages)

module.exports = router;