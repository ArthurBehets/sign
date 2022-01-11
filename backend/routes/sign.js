const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer');
const auth = require('../middleware/auth');


const signCtrl = require('../controllers/sign');

router.get('/getOne/:signId',  signCtrl.getOne);
router.get('/getOneCategory/:categoryId', signCtrl.getOneCategory);
router.get('/getAllCategories', signCtrl.getAllCategories);
router.get('/getAllSigns', signCtrl.getAllSigns);

router.post('/createSign', signCtrl.createSign);
router.post('modifyTraduction', auth, signCtrl.modifyTraduction);
router.post('modifyCategory', auth, signCtrl.modifyCategory);
router.post('deleteSign', auth, signCtrl.deleteSign);

router.post('/getToWork', signCtrl.getToWork);
router.post('/getKnown', signCtrl.getKnown);
router.post('/getOneToWork', signCtrl.getOneToWork);
router.post('/getOneKnown', signCtrl.getOneKnown);

router.post('/addToKnown/:statement', signCtrl.addToKnown);
router.post('/addToWork/:statement', signCtrl.addToWork);

module.exports = router;