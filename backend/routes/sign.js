const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer');
const auth = require('../middleware/auth');


const signCtrl = require('../controllers/sign');

router.get('/getOne/:signId', auth, signCtrl.getOne);
router.get('/getOneCategory/:categoryId', auth, signCtrl.getOneCategory);

router.post('/createSign', auth , multer,  signCtrl.createSign);
router.post('modifyTraduction', auth, signCtrl.modifyTraduction);
router.post('modifyCategory', auth, signCtrl.modifyCategory);
router.post('deleteSign', auth, signCtrl.deleteSign);

router.post('/validProposition', auth, signCtrl.validProposition);
router.post('/modificationPropositionCategory', auth, signCtrl.modificationPropositionCategory);
router.post('/modificationPropositionTraduction', auth, signCtrl.modificationPropositionTraduction);

router.post('/addToKnown', auth, signCtrl.addToKnown);
router.post('/addToWork', auth, signCtrl.addToWork);

router.post('/rmFromKnown', auth, signCtrl.addToKnown);
router.post('/rmFromToWork', auth, signCtrl.addToWork);

router.get('getPropositions', auth, signCtrl.getPropositions);


module.exports = router;