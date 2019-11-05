const express = require('express');
const viewComicController = require('../controllers/comic.view.controller');
const router = express.Router();

router.get('/', viewComicController.index);

module.exports = router;