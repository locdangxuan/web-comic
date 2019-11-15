const express = require('express');
const router = express.Router();

const chapterController = require('../app/api/controllers/chapter.controller');


router.get('/create-list-chapter', chapterController.createListChapter);
router.get('/add-new-chapter', chapterController.addNewChapter);
router.get('/update-chapter', chapterController.updateChapter);
router.get('/list-chapter', chapterController.getAllChapter);
router.get('/delete-chapter', chapterController.deleteChapter);

module.exports = router;