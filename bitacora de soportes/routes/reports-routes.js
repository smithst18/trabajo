const express = require('express');

const reportController = require('../controllers/reports');
const router = express.Router();

router.post('/save-report',reportController.saveReport);
//router.get('/all-reports',reportController.getAllReports);
router.get('/get-reports/:ci',reportController.getReports);
router.put('/update-report/:id',reportController.updateReport);
router.get('/get-one/:id',reportController.getOneReport)
router.delete('/delete-report/:id',reportController.deleteReport);

module.exports = router;
