const express = require('express');
const {
    getStudents,
    getStudentByID,
    createStudent,
    updateStudent,
    deleteStudent
} = require('../controllers/manager');

// Create router object
const router = express.Router();

// Route to get all students list (GET)
router.get('/getall', getStudents);

// Route to get student by ID (GET)
router.get('/get/:id', getStudentByID);

// Route to create a new student (POST)
router.post('/create', createStudent);

// Route to update a student (PUT)
router.put('/update/:id', updateStudent);

// Route to delete a student (DELETE)
router.delete('/delete/:id', deleteStudent);

module.exports = router;
