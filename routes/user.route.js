const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/user.controller');

router.get('/list-user', userController.getListUser);
router.get('/:id', userController.getUserById);
router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.put('/update', userController.update);
router.put('/update-password', userController.updatePassword);
router.delete('/delete', userController.delete);

module.exports = router;