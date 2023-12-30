const express = require('express');
const router = express.Router();
const mainController = require('./mainController/mainController.js');
const scriptController = require('./mainController/scriptController.js');


router.get('/', mainController.getHomePage);

router.get('/testingFec', mainController.getTestingPage);

router.get('/sort', scriptController.sortNumPiece);

router.post('/test', mainController.test);

router.use(mainController.getErrorPage);


module.exports = router;