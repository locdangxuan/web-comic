const express = require('express');
const viewUserController = require('../controllers/user.view.controller');
const router = express.Router();

router.get('/', viewUserController.index);

module.exports = router;