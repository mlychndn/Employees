const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const catchAsync = require('./../util/catchAsync');
const  AppError = require('./../util/appError');

const Usernew = require('./../model/userModel');

const signToken = (id)=> {
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user._id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.JWT_EXPIRES_IN*24*60*60*1000
        ),
        httpOnly: true,
    }


res.cookie('jwt', token, cookieOptions);
user.password = undefined;

res.status(statusCode).json({
    status: 'success',
    token,
    data: {
        user,
    }
});

};

exports.signUp = catchAsync(async (req, res, next)=> {
    
  const user = await Usernew.create(req.body);
createSendToken(user, 201, res);
});


exports.login = catchAsync(async(req, res, next) => {
    const {emailId, password} = req.body;

    // 1) Check if email and password exist.
       if(!emailId || !password){
           return next(new AppError('Please provide email and password', 400));
       }

    // 2) Check if user exists && password is correct.
      const user = await Usernew.findOne({emailId}).select('+password');
    //   console.log(user);

      if(!user || !await user.correctPassword(password, user.password)){
          return next(new AppError('Incorrect email or password',401));
      }

    // 3) If everything ok, send token to client.
    createSendToken(user, 200, res);
      
});

// this controller to check if user is logged in or not.
exports.protect =  catchAsync(async (req, res, next) => {
  let token;

  // Getting off token and check if it's there
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]; 
     }else if(req.cookies.jwt){
         token = req.cookies.jwt;
}
 if(!token){
     return next(new AppError('You are not logged in! Please log in to get access'), 401); // 401 means unauthorized
}

// verification of token
 const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

// check if user still exists
const currentUser = await Usernew.findById(decoded.id);
if(!currentUser){
    return next(new AppError('User recently changed password! Please login Again', 401));  // 401 means unauthorized

}
if(currentUser.changedPasswordAfter(decoded.iat)){
    return next(new AppError('User recently changed password! Please log in again', 401));
 }

 // GRANT ACCESS TO PROTECTED ROUTE
 req.user = currentUser;
 next();

});
