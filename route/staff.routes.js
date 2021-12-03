const express = require('express');
const staffRoute = express.Router();
const bcrypt = require('bcryptjs')
const errorHandler = require("../utills/errorHandler")
var moment = require('moment')
var today = moment().format('MM-DD');
var month = moment().format('MM-31');

let Employee = require('../model/Employee');

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

// Get all Staff
staffRoute.route('/').get((req, res) => {
  Employee.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Add employee
staffRoute.post('/add-employee', async (req, res) => {
  const candidate = await Employee.findOne({ email: req.body.email })
  var date = moment(req.body.date).format('YYYY-MM-DD');
  var dateWithOutYear = moment(req.body.date).format('MM-DD');
  if (candidate) {
    res.status(409).json({
      massage: "This email is already taken. Try another."
    })
  } else {
    const salt = bcrypt.genSaltSync(10)
    const password = req.body.password
    const user = new Employee({
      position: req.body.position,
      date: date,
      name: req.body.name,
      email: req.body.email,
      salary: req.body.salary,
      phone: req.body.phone,
      role: req.body.role,
      salary: req.body.salary,
      info: req.body.info,
      file: req.body.file,
      toDoList: req.body.toDoList,
      dateWithOutYear: dateWithOutYear,
      id: req.body._id,
      password: bcrypt.hashSync(password, salt)
    })
    try {
      await user.save()
      res.status(201).json(user)
    } catch (e) {
      errorHandler(res, e)
    }
  }
})
staffRoute.route('/birthday-employee').get((req, res) => {
  Employee.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json({
        birthday: data.birthday
      })
    }
  })
})

// Get all Staff Pagination 
staffRoute.route('/stafflist').get((req, res) => {
  const { page, size, name } = req.query;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};

  const { limit, offset } = getPagination(page, size);

  Employee.paginate(condition, { offset, limit })
    .then((data) => {
      res.json({
        totalItems: data.totalDocs,
        staffList: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
        data: data
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    })
})

// Get employee 
staffRoute.route('/read-employee/:id').get((req, res) => {
  Employee.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Birth select date
staffRoute.route('/getBirth-Select').get((req, res) => {
  console.log(req.query);
  Employee.find({ dateWithOutYear: { $eq: req.query.date } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})


// Update employee
staffRoute.route('/update-employee/:id').put((req, res, next) => {
  req.body.dateWithOutYear = moment(req.body.date).format('MM-DD');
  Employee.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
      console.log(data);
      console.log('employer updated successfully!')

    }
  })
})

staffRoute.route('/getEmpl-Today').get((req, res) => {
  Employee.find({ dateWithOutYear: { $eq: today } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})

staffRoute.route('/getEmpl-Later').get((req, res) => {
  Employee.find({ dateWithOutYear: { $gt: month } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})

staffRoute.route('/getEmpl-Month').get((req, res) => {
  Employee.find({ dateWithOutYear: { $gt: today, $lte: month } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})

// Delete employee
staffRoute.route('/delete-employee/:id').delete((req, res, next) => {
  Employee.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
});



module.exports = staffRoute;