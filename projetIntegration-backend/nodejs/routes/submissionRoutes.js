// routes/submissionRoutes.js
const express = require("express");
const router = express.Router();
const submissionController = require("../controller/submissionController");

// Route to create a new submission
router.post("/", submissionController.createSubmission);

// Route to get all submissions
router.get("/", submissionController.getAllSubmissions);

// Route to get a submission by ID
router.get("/:id", submissionController.getSubmissionById);

// Route to update a submission by ID
router.put("/:id", submissionController.updateSubmission);

// Route to delete a submission by ID
router.delete("/:id", submissionController.deleteSubmission);

module.exports = router;
