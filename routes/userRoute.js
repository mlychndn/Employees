const express = require('express');
const userController = require('./../controller/userController');
const authController = require('./../controller/authController');

const router = express.Router();

router.get('/', authController.protect, userController.getUser);
router.post('/signUp', authController.signUp);
router.post('/login', authController.login);

module.exports = router;