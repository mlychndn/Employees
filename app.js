const express = require('express');
const path = require('path');
const cors = require('cors');
const userRouter = require('./routes/userRoute');
const empRouter = require('./routes/empRoute');
const viewRouter = require('./routes/viewRoute');
const cookieParser = require('cookie-parser');

const app = express();
app.set('view engine', 'pug');

app.use(express.json());
app.use(cookieParser());
//serving static files:
app.use(express.static(path.join(__dirname,'public')));
app.use(cors({credentials: true, origin: true }));



app.use((req, res, next)=>{
     console.log('Hello from the middleware😁');
     next();
  })

app.use((req, res, next) => {
    console.log(req.cookies);
    next();
})

app.use('/',viewRouter);
app.use('/api/v1/emps', empRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

