const Application = require('../models/application');

const createApplication = async (req, res) => {
    try {
        const { internshipId } = req.body;
        const studentId = req.user.id;
        const studentName = req.user.name;
        const studentEmail = req.user.email;

        // Check if the student has already applied for this internship
        const existingApplication = await Application.findOne({ studentId, internshipId });
        if (existingApplication) {
            return res.status(400).json({ message: "You have already applied for this internship." });
        }

        const application = await Application.create({
            studentId,
            studentName,
            studentEmail,
            internshipId,
            status: "Applied"
        });

        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getApplications = async (req, res) => {
    try {
        const query = {};
        // If user is a student, only retrieve their own applications
        if (req.user.role === 'student') {
            query.studentId = req.user.id;
        }

        // Retrieve and populate internship details for a richer tracking view
        const applications = await Application.find(query).populate('internshipId'); 
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateApplicationStatus = async (req, res) => {
    try {
        const { status } = req.body;
        if (!["Shortlisted", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status value. Must be 'Shortlisted' or 'Rejected'." });
        }

        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).populate('internshipId');

        if (!application) {
            return res.status(404).json({ message: "Application not found" });
        }

        res.status(200).json(application);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createApplication,
    getApplications,
    updateApplicationStatus
};

