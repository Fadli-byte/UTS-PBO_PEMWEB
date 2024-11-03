const Feedback = require('../models/Feedback');

class FeedbackController {
    // Get all feedback
    static async getAllFeedback(req, res) {
        try {
            const feedbacks = await Feedback.getAll();
            res.render('feedback/list', { 
                feedbacks,
                user: req.session.user,
                success: req.flash('success'),
                error: req.flash('error')
            });
        } catch (error) {
            console.error('Error getting feedback:', error);
            req.flash('error', 'Failed to load feedback');
            res.redirect('/');
        }
    }

    // Show create feedback form
    static showCreateForm(req, res) {
        res.render('feedback/add', {
            user: req.session.user,
            error: req.flash('error')
        });
    }

    // Create new feedback
    static async createFeedback(req, res) {
        try {
            const { title, description, category } = req.body;
            const user_id = req.session.user.id;

            await Feedback.create({
                user_id,
                title,
                description,
                category
            });

            req.flash('success', 'Feedback submitted successfully');
            res.redirect('/feedback');
        } catch (error) {
            console.error('Error creating feedback:', error);
            req.flash('error', 'Failed to submit feedback');
            res.redirect('/feedback/add');
        }
    }

    // Show edit feedback form
    static async showEditForm(req, res) {
        try {
            const feedback = await Feedback.getById(req.params.id);
            if (!feedback) {
                req.flash('error', 'Feedback not found');
                return res.redirect('/feedback');
            }
            
            res.render('feedback/edit', {
                feedback,
                user: req.session.user,
                error: req.flash('error')
            });
        } catch (error) {
            console.error('Error loading feedback:', error);
            req.flash('error', 'Failed to load feedback');
            res.redirect('/feedback');
        }
    }

    // Update feedback
    static async updateFeedback(req, res) {
        try {
            const { title, description, category, status } = req.body;
            const result = await Feedback.update(req.params.id, {
                title,
                description,
                category,
                status
            });

            if (result) {
                req.flash('success', 'Feedback updated successfully');
            } else {
                req.flash('error', 'Feedback not found');
            }
            res.redirect('/feedback');
        } catch (error) {
            console.error('Error updating feedback:', error);
            req.flash('error', 'Failed to update feedback');
            res.redirect(`/feedback/edit/${req.params.id}`);
        }
    }

    // Delete feedback
    static async deleteFeedback(req, res) {
        try {
            const result = await Feedback.delete(req.params.id);
            if (result) {
                req.flash('success', 'Feedback deleted successfully');
            } else {
                req.flash('error', 'Feedback not found');
            }
            res.redirect('/feedback');
        } catch (error) {
            console.error('Error deleting feedback:', error);
            req.flash('error', 'Failed to delete feedback');
            res.redirect('/feedback');
        }
    }
}

module.exports = FeedbackController;