const db = require("../config/db");

// Get all students
const getStudents = async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM task");

        if (!data || data[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: "No student records found",
            });
        }

        res.status(200).send({
            success: true,
            message: "All student records",
            totalStudents: data[0].length,
            data: data[0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in fetching all student records',
            error: error.message,
        });
    }
};

// Get student by ID
const getStudentByID = async (req, res) => {
    try {
        const studentId = req.params.id;

        if (!studentId) {
            return res.status(400).send({
                success: false,
                message: 'Please provide a valid student ID',
            });
        }

        const data = await db.query(`SELECT * FROM task WHERE id=?`, [studentId]);

        if (!data || data[0].length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No student record found with the provided ID',
            });
        }

        res.status(200).send({
            success: true,
            studentDetails: data[0][0],
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in fetching student by ID',
            error: error.message,
        });
    }
};

// Create student
const createStudent = async (req, res) => {
    try {
        const { Title, Description, Status } = req.body;

        if (!Title || !Description || !Status) {
            return res.status(400).send({
                success: false,
                message: 'Please provide all required fields',
            });
        }

        const data = await db.query(`INSERT INTO task (Title, Description, Status) VALUES (?, ?, ?)`, [Title, Description, Status]);

        res.status(201).send({
            success: true,
            message: 'New student record created',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in creating student record',
            error: error.message,
        });
    }
};

// Update student
const updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id;

        if (!studentId) {
            return res.status(400).send({
                success: false,
                message: 'Please provide a valid student ID',
            });
        }

        const { Title, Description, Status } = req.body;

        const data = await db.query(`UPDATE task SET Title=?, Description=?, Status=? WHERE id=?`, [Title, Description, Status, studentId]);

        res.status(200).send({
            success: true,
            message: 'Student record updated',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in updating student record',
            error: error.message,
        });
    }
};

// Delete student
const deleteStudent = async (req, res) => {
    try {
        const studentId = req.params.id;

        if (!studentId) {
            return res.status(400).send({
                success: false,
                message: 'Please provide a valid student ID',
            });
        }

        await db.query(`DELETE FROM task WHERE id=?`, [studentId]);

        res.status(200).send({
            success: true,
            message: 'Student record deleted successfully',
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in deleting student record',
            error: error.message,
        });
    }
};

module.exports = { getStudents, getStudentByID, createStudent, updateStudent, deleteStudent };
