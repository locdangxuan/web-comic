const express = require('express');
const router = express.Router();
const comicController = require('../app/api/controllers/comic.controller');

router.get('/add-comic', comicController.addComic);
router.get('/list-comic', comicController.getAllComic);

module.exports = router;
