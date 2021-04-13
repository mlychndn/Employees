const express = require('express');
const viewController = require('./../controller/viewController');

const router = express.Router();

router
.get('/', viewController.getEmployees )

router
.get('/signup', (req, res)=> {
    res.status(200).render('register');
})

router.get('/login', (req, res)=> {
    res.status(200).render('login');
})

router.post('/',(req,res,)=>{
    console.log(req.body);
})


module.exports = router;