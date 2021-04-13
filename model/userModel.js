// Register a user with First Name, Last Name, Email-Id, Password, a unique Employee Id, Organization name;

const mongoose  = require("mongoose");
const validator = require("validator");
const shortid = require("shortid");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: [true, 'Please tell us your First Name']
    },
    lastName: String,
    emailId:{
        type:String,
        required: true,
        unique: true,
        lowerCase: true,
        validate: [validator.isEmail, 'Please provide your email account']
    },
    password:{
        type: String,
        required: [true, 'Please provide your password'],
        minlength: 8,
        select: false,
        
    },
    passwordConfirm: {
        type: String,
        required: [true, 'Please Confirm your password'],
        validate: {
            // This only works on create and save
            validator: function(el){
                return el === this.password
            },
            message: 'Password is not same😒'
        }
    },
    organizationName: {
        type: String,
        required: [true, 'Please tell us your organization name']
     },
     employeeId: {
         //required: true,
         type: String,
         default: shortid.generate
     },
     role: {
         type: String,
         enum: ['trainee', 'developer', 'senior developer', 'manager', 'admin'],
         default: 'trainee'
     },
     passwordChangedAt: Date,
     
})


// encrypting the password:
userSchema.pre('save', async function(next){

    // only run the function if password was actually modified.
    if(!this.isModified('password')) return next();

    //Hash the password with cost of 12
    this.password = await bcrypt.hash(this.password, 12);

    // Delete password confirm field
    this.passwordConfirm = undefined;
    next();

})

// Creating instance method, Instance methods are available on all documents.
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {

    return  await bcrypt.compare(candidatePassword, userPassword);

}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime()/1000, 10);
        console.log(changedTimestamp, JWTTimestamp);
        return JWTTimestamp < changedTimestamp; // 
    }

    //  False means not chnaged.
    return false

}

const Usernew = mongoose.model('Usenew', userSchema);

module.exports = Usernew;