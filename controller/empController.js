const Employee = require('./../model/employeeModel');
const catchAsync = require('./../util/catchAsync');

// To get all records of employees
exports.getEmpDetails = async (req, res, next)=> {
   const emp = await Employee.find();
     console.log(emp);

   res.status(200).json({
       status: 'success',
       result:  emp.length,
       data: {
           emp,
       }
   })

}

// To create records for employees
exports.createEmpDetails = catchAsync(async(req, res, next)=> {
    console.log(req.body);   
    const emp = await Employee.create(req.body);

    res.status(200).json({
        status: 'success',
        data: {
            emp,
        }
    })
});

// To get single employee details
exports.getEmp = async(req, res, next)=> {
    const emp = Employee.findById(req.params.id);

    res.send(200).json({
        status: 'success',
        data: {
            emp,
        }
    })
}