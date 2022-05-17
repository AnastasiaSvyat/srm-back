const express = require('express');
const LogTimeVacationRoute = express.Router();
let LogTimeVacation = require('../model/LogTimeRequest');
var moment = require('moment')



LogTimeVacationRoute.route('/createLogTimeVacation').post((req, res, next) => {

  const year = moment().format('yyyy');

  req.body.counterUpdateDate = moment(req.body.date).format(year + '-MM-DD');

  LogTimeVacation.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

LogTimeVacationRoute.route('/currentRequest').get((req, res) => {

  var today = moment().format('yyyy-MM-DD');

  LogTimeVacation.find({ counterUpdateDate: { $gt: today } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})

LogTimeVacationRoute.route('/createLogTimeVacationInNewYear').post((req, res, next) => {

  req.body.counterUpdateDate = moment(req.body.counterUpdateDate).add(1, 'year').format('yyyy-MM-DD');

  LogTimeVacation.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

LogTimeVacationRoute.route('/updateDate-logTimeVacationById/:id').put((req, res, next) => {

  req.body.counterUpdateDate = moment(req.body.date).add(1, 'year').format('yyyy-MM-DD');

  LogTimeVacation.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
})

LogTimeVacationRoute.route('/logTimeVacationThisYear').get((req, res) => {
  const reqFilter = {
    idEmployee: req.query.idEmployee,
  }
  var condition = reqFilter ? { idEmployee: reqFilter.idEmployee } : {};

  LogTimeVacation.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})

LogTimeVacationRoute.route('/updateDate-logTimeVacation').get((req, res) => {

  const idEmployee = req.query.idEmployee

  var condition = idEmployee ? { idEmployee: idEmployee } : {};

  LogTimeVacation.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})

LogTimeVacationRoute.route('/updateDateVacation/:id').put((req, res, next) => {
  LogTimeVacation.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
})

LogTimeVacationRoute.route('/currentRequestByEmployeeId').put((req, res, next) => {
  var today = moment().format('yyyy-MM-DD');
  const reqFilter = {
    idEmployee: req.query.idEmployee,
  }
  var condition = reqFilter ? { idEmployee: reqFilter.idEmployee, counterUpdateDate: { $gt: today } } : {};
  var employee = reqFilter ? { idEmployee: reqFilter.idEmployee } : {};

  LogTimeVacation.findOneAndUpdate(condition, {
    $inc: { vacation: req.body.vacation, sickLeave: req.body.sickLeave }
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      if (data) {
        res.json(data)
      } else {
        LogTimeVacation.find(employee)
          .then(data => {
            if (data) {
              req.body.counterUpdateDate = moment(data.date).add(1, 'year').format('yyyy-MM-DD');
              LogTimeVacation.create(req.body, (error, data) => {
                if (error) {
                  return next(error)
                } else {
                  res.json(data)
                }
              })
            }
          })
          .catch(err => {
            res.status(500).send({
            });
          });
      }
    }
  })
})


LogTimeVacationRoute.route('/declineCurrentRequestByEmployeeId').put((req, res, next) => {
  const reqFilter = {
    idEmployee: req.query.idEmployee,
  }
  var condition = reqFilter ? { idEmployee: reqFilter.idEmployee, counterUpdateDate: { $gt: req.body.date } } : {};

  LogTimeVacation.findOneAndUpdate(condition, {
    $inc: { vacation: -req.body.vacation, sickLeave: -req.body.sickLeave }
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
})



LogTimeVacationRoute.route('/currentRequest').get((req, res) => {

  var today = moment().format('MM-DD-yyyy');

  LogTimeVacation.find({ counterUpdateDate: { $gt: today } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})

module.exports = LogTimeVacationRoute;
