// update student
const updateStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        if (!studentId) {
            return res.status(404).send({
                success: false,
                message: 'Invalid ID or Provide Student ID'
            })
        }
        const { Title, Description, Status } = req.body;
        const data = await db.query(`UPDATE task SET Title=?, Description=?, Status=? WHERE id=?`, [Title, Description, Status, studentId]);
        if (!data) {
            return res.status(500).send({
                success: false,
                message: 'Error in update data'
            })
        }
        res.status(200).send({
            success: true,
            message: "Student Details Updated",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in Update Student API',
            error
        });
    }
};