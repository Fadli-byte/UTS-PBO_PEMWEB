const db = require('../config/db');

class Feedback {
    static async getAll() {
        try {
            const [rows] = await db.query(`
                SELECT f.*, a.username 
                FROM feedback f 
                JOIN accounts a ON f.user_id = a.id 
                ORDER BY f.created_at DESC
            `);
            return rows;
        } catch (error) {
            throw error;
        }
    }

    static async getById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM feedback WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    static async create(feedbackData) {
        try {
            const { user_id, title, description, category } = feedbackData;
            const [result] = await db.query(
                'INSERT INTO feedback (user_id, title, description, category) VALUES (?, ?, ?, ?)',
                [user_id, title, description, category]
            );
            return result.insertId;
        } catch (error) {
            throw error;
        }
    }

    static async update(id, feedbackData) {
        try {
            const { title, description, category, status } = feedbackData;
            const [result] = await db.query(
                'UPDATE feedback SET title = ?, description = ?, category = ?, status = ? WHERE id = ?',
                [title, description, category, status, id]
            );
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    static async delete(id) {
        try {
            const [result] = await db.query('DELETE FROM feedback WHERE id = ?', [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Feedback;