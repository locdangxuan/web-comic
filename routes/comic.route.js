const express = require('express');
const router = express.Router();
const comicController = require('../app/api/controllers/comic.controller');

router.get('/create-comic', comicController.addComic);
router.get('/list-comic', comicController.getListComic);

module.exports = router;
