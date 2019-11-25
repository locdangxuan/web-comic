const express = require('express');
const router = express.Router();

const comicController = require('../app/api/controllers/comic.controller');
const chapterController = require('../app/api/controllers/chapter.controller');

//<---------------get list comic------------------------->
router.get('/search-comic', comicController.searchComic);
router.post('/create-comic', comicController.create);
router.get('/list-comic', comicController.getListComic);
router.delete('/delete-comic', comicController.delete);
router.get('/:id', comicController.getComicById);
router.put('/:id/update-comic', comicController.update);


//<----------------chapter in each comic----------------->
router.post('/:id/create-list-chapter', chapterController.createListChapter);
router.post('/:id/add-new-chapter', chapterController.addNewChapter);
router.put('/:id/update-chapter', chapterController.updateChapter);
router.get('/:id/list-chapter', chapterController.getListChapter);
router.post('/:id/delete-chapter', chapterController.deleteChapter);


module.exports = router;

