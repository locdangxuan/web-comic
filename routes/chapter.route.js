const express = require('express');
const router = express.Router();

const chapterController = require('../app/api/controllers/chapter.controller');

router.post('/create-list-chapter', chapterController.createListChapter);
router.post('/add-new-chapter', chapterController.addNewChapter);
router.post('/update-chapter', chapterController.updateChapter);
router.get('/list-chapter', chapterController.getAllChapter);
router.post('/delete-chapter', chapterController.deleteChapter);

module.exports = router;