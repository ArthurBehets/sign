const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer');
const auth = require('../middleware/auth');

const signCtrl = require('../controllers/sign');

router.get('/getOne/:signId', auth, signCtrl.getOne);
router.get('/getOneCategory/:categoryId', auth, signCtrl.getOneCategory);

router.post('/createSign', auth, signCtrl.createSign);
router.post('modifySign', auth, signCtrl.modifySign);
router.post('deleteSign', auth, signCtrl.deleteSign);

router.post('/createProposition', auth, signCtrl.createProposition);
router.post('/modificationProposition', auth, signCtrl.modificationProposition);

router.post('/addToKnown', auth, signCtrl.addToKnown);


module.exports = router;