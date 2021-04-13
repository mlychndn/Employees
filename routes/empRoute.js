const express = require('express');
const empController = require('./../controller/empController');
const authController = require('./../controller/authController');


const router = express.Router();

router
.get('/', authController.protect, empController.getEmpDetails)

router
.post('/',  empController.createEmpDetails);


router
.get('/:id', authController.protect, empController.getEmp);


module.exports = router;