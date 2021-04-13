const Usernew = require('./../model/userModel');
const catchAsync = require('./../util/catchAsync');


// get All users
exports.getUsers = catchAsync(async (req, res, next)=> {
    
    const user = await Usernew.find()

    res.status(200).json({
        status: 'success',
        message: 'Your are using get route😊',
        data: {
            user: user
        }
    })
});

// Get user by Id;
exports.getUser = catchAsync(async(req, res, next) => {
    
    const user = await Usernew.findById(req.body.params)
})

exports.createUser = async (req, res)=> {

    res.status(200).json({
        status: 'success',
        message: 'This route is under construction'
    })
}

// get user by name