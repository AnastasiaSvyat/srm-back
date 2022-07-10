const express = require('express');
const staffRoute = express.Router();
const bcrypt = require('bcryptjs')
const errorHandler = require("../utills/errorHandler")
var moment = require('moment')
var today = moment().format('MM-DD');
var month = moment().format('MM-31');
var now = new Date();
var mon = now.getMonth() + 1;

let Employee = require('../model/Employee');

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

// Get all Staff
staffRoute.route('/').get((req, res) => {
  // Employee.find().sort({ lastName: 1 },(error, data) => {
  //   if (error) {
  //     return next(error)
  //   } else {
  //     res.json(data)
  //   }
  // })

  Employee.find().sort({ lastName: 1 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})


// Add employee
staffRoute.post('/add-employee', async (req, res) => {
  const candidate = await Employee.findOne({ email: req.body.email })
  console.log(req.body.date);
  if(req.body.date){
    var date = moment(req.body.date).format('YYYY-MM-DD');
    var dateWithOutYear = moment(req.body.date).format('MM-DD');
  }
  
  try {
    if (candidate) {
      res.status(409).json({
        massage: "This email is already taken. Try another."
      })
    } else {
      const salt = bcrypt.genSaltSync(10)
      const password = req.body.password
      const user = new Employee({
        position: req.body.position,
        date: date || req.body.date,
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role,
        salary: req.body.salary,
        info: req.body.info,
        infoUser: req.body.infoUser,
        skype: req.body.skype,
        // file: req.body.file,
        startDate: req.body.startDate,
        dateWithOutYear: dateWithOutYear || req.body.date,
        id: req.body._id,
        password: bcrypt.hashSync(password, salt)
      })
      user.save()
      res.status(201).json(user)
    }
  } catch (error) {
    return res.send(error);
  }
})

staffRoute.route('/update-password/:id').put((req, res, next) => {
  const salt = bcrypt.genSaltSync(10)
  req.body.password = bcrypt.hashSync(req.body.password, salt);
  Employee.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
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


staffRoute.route('/getStaffList').get((req, res) => {
  Employee.find().sort({ lastName: 1 }).collation({ locale: "en", caseLevel: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
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
staffRoute.put('/update-employee/:id', async (req, res, next) => {
  const candidate = await Employee.findOne({ email: req.body.email })
  const candidateId = await Employee.findOne({ email: req.body.email, _id: req.body.id })
  req.body.dateWithOutYear = moment(req.body.date).format('MM-DD');
  try {
    if (candidateId) {
      Employee.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, (error, data) => {
        if (error) {
          return res.send(error);
        } else {
          res.json(data)

        }
      })
    } else if (candidate) {
      res.status(409).json({
        massage: "This email is already taken. Try another."
      })
    } else {
      Employee.findByIdAndUpdate(req.params.id, {
        $set: req.body
      }, (error, data) => {
        if (error) {
          return res.send(error);
        } else {
          res.json(data)

        }
      })
    }
  } catch (error) {
    return res.send(error);
  }
})

staffRoute.route('/getEmpl-Today').get((req, res) => {
  var today = moment().format('MM-DD');
  Employee.find({ dateWithOutYear: { $eq: today } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})

staffRoute.route('/getEmpl-LaterStart').get((req, res) => {
  var monthEnd = moment().format('MM-31');

  Employee.find({ dateWithOutYear: { $gt: monthEnd } }).sort({ dateWithOutYear: 1 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})

staffRoute.route('/getEmpl-LaterEnd').get((req, res) => {
  var monthStart = moment().format('MM-01');


  Employee.find({ dateWithOutYear: { $lt: monthStart } }).sort({ dateWithOutYear: 1 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})

staffRoute.route('/getEmpl-Month').get((req, res) => {
  var today = moment().format('MM-01');
  var month = moment().format('MM-31');

  Employee.find({ dateWithOutYear: { $gt: today, $lte: month } }).sort({ dateWithOutYear: 1 })
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