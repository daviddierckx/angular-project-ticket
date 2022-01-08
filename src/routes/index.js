const express = require('express')
const router = express.Router();

const { Employee } = require('../models/employee');
const { Festival } = require('../models/festival');

//Get All Employees
router.get('/api/festival', (req, res) => {
    Festival.find({}, (err, data) => {
        if (!err) {
            res.send(data);
        } else {
            console.log(err);
        }
    })
})

//Save Employee
router.post('/api/festival', (req, res) => {
    const emp = new Employee({
        name: req.body.name,
        email: req.body.email,
        salary: req.body.salary
    });
    emp.save((err, data) => {
        res.status(200).json({ code: 200, message: 'Employee Added Succesfully', addEmployee: data })
    })
})

//Get Single Employee
router.get('/api/festival/:id', (req, res) => {
    Employee.findById(req.params.id, (err, data) => {
        if (!err) {
            res.send(data)
        } else {
            console.log(err);
        }
    })
});

//Update Employee
router.put('/api/festival/edit/:id', (req, res) => {
    const emp = ({
        name: req.body.name,
        email: req.body.email,
        salary: req.body.salary
    });
    Employee.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, data) => {
        if (!err) {
            res.status(200).json({
                code: 200, message: 'Employee Updated Succesfully',
                updateEmployee: data
            })
        } else {
            console.log(err);
        }
    })
})

//Delete Employee
router.delete('/api/festival/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, data) => {
        if (!err) {
            res.status(200).json({ code: 200, message: 'Employee Deleted Succesfully', deleteEmployee: data })
        } else {
            console.log(err);
        }
    })
})
module.exports = router;