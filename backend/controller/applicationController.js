const Application = require('../models/Application');

const createApplication = async (req, res) => {
    try {
        const application = await Application.create(req.body);
        res.status(201).json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getApplications = async (req, res) => {
    try {
        const applications = await Application.find(); 
        res.status(200).json(applications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateApplicationStatus = async (req, res) => {
    try{
        const application=
            await Application.findByIdAndUpdate(
                req.params.id,
                { status: req.body.status },
                { new: true }
            );
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
