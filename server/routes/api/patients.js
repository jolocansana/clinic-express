// Routes for Patient
const express = require('express')
// const mongoose = require('mongoose')
const router = express.Router()


// Add Patients

// Retrieve Patients

/**
 * Returns list of Patient envelopes
 */
router.get('/', (req, res) => {
    res.send("patients")
})


/**
 * Returns patient envelope from DB based from ID.
 * @param patientEnvelope (json)
 * @return patientEnvelope(json)
 */

// Update Patient

// Delete Patient

module.exports = router;