const express = require('express');
const logTimeRoute = express.Router();
let LogTime = require('../model/logTime');

logTimeRoute.route('/logTimeEmployee').get((req, res) => {
  LogTime.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

logTimeRoute.route('/logTime').post((req, res, next) => {
  LogTime.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

logTimeRoute.route('/logTimeById').get((req, res) => {
  var condition = req.query.idEmployee ? { idEmployee: req.query.idEmployee, } : {};
  LogTime.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})

logTimeRoute.route('/update-logTime/:id').put((req, res, next) => {
  LogTime.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
})

logTimeRoute.route('/getLogTimeCurrentMonth').get((req, res) => {
  const selectMonthAndYear = req.query.selectMonthAndYear
  var condition = selectMonthAndYear ? { selectMonthAndYear: selectMonthAndYear } : {};
  LogTime.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
});

logTimeRoute.route('/getLogTimeSelectEmployeeCurrentMonth').get((req, res) => {
  const reqFilter = {
    selectMonthAndYear: req.query.selectMonthAndYear,
    idEmployee: req.query.idEmployee
  }
  var condition = reqFilter ? { selectMonthAndYear: reqFilter.selectMonthAndYear,  idEmployee: reqFilter.idEmployee, } : {};
  
  LogTime.findOne(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
});

module.exports = logTimeRoute;
