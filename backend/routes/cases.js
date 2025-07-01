const express = require('express');
const router = express.Router();
const caseController = require('../controllers/caseController');
const auth = require('../middleware/auth');

router.post('/', auth, caseController.createCase);
router.get('/', auth, caseController.getCases);
router.get('/:id', auth, caseController.getCaseById);
router.put('/:id', auth, caseController.updateCase);
router.delete('/:id', auth, caseController.deleteCase);

module.exports = router; 