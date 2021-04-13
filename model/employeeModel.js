const mongoose = require('mongoose');

// developing employee schema
const employeeSchema = new mongoose.Schema({
    
    age: {
        type: Number,
        required: [true, 'Age is required!']
    },
    bloodGroup: String,
    description: String,
    imageCover: String,
    user: [
        {
          type: mongoose.Schema.ObjectId,
          ref:  'Usenew'
    }
]
})

// refrencing user table and emptable using query middleeware.
employeeSchema.pre(/^find/, function(next){
    this.populate({
        path:'user'
    })
    next();
})

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;