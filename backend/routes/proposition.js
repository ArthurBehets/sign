const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer');
const auth = require('../middleware/auth');

const propositionCtrl = require('../controllers/proposition');

router.get('getPropositions', auth, propositionCtrl.getPropositions);

router.post('createProposition', auth, propositionCtrl.createProposition);

module.exports = router;