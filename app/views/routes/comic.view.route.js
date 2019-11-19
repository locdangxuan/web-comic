const express = require('express');
const router = express.Router();
const viewComicController = require('../controllers/comic.view.controller');
const viewChapterController = require('../controllers/chapter.view.controller');

router.get('/', viewComicController.index);

router.get('/:id', viewChapterController.getListChapter);

router.get('/:id/:chapterNumber', viewChapterController.getImage);   

module.exports = router;