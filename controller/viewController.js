const Employee = require("../model/employeeModel");
const catchAsync = require("./../util/catchAsync");

exports.getEmployees = async (req, res) => {
    //1) Get Employee data:
    const emp = await Employee.find();
     console.log(emp);
     console.log(emp[0].user[0].firstName);

    res.status(200).render('employee', {
        emp,
    })
};