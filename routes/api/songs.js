const express = require('express');
const router = express.Router();
const songsController = require('../../controllers/songs');

router.get('/:songName', songsController.get);



module.exports = router;