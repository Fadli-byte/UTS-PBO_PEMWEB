const express = require('express');
const router = express.Router();
const FeedbackController = require('../controllers/feedbackController');
const { isAuthenticated } = require('../middlewares/auth');

// Apply authentication middleware to all feedback routes
router.use(isAuthenticated);

// List all feedback
router.get('/', FeedbackController.getAllFeedback);

// Show create form
router.get('/add', FeedbackController.showCreateForm);

// Create new feedback
router.post('/add', FeedbackController.createFeedback);

// Show edit form
router.get('/edit/:id', FeedbackController.showEditForm);

// Update feedback
router.post('/edit/:id', FeedbackController.updateFeedback);

// Delete feedback
router.post('/delete/:id', FeedbackController.deleteFeedback);

module.exports = router;