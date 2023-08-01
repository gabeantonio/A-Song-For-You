const express = require('express');
const router = express.Router();
const likesController = require('../../controllers/likes');

router.post('/posts/:id/likes', likesController.create);
router.delete('/likes/:id', likesController.deleteLike);

module.exports = router;