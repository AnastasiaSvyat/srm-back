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

LogTimeVacationRoute.route('/checkCorrectUpdateDateOrCreateLogTimeVacation').put((req, res, next) => {
  const today = moment().format('yyyy-MM-DD');
  const reqFilter = {
    idEmployee: req.query.idEmployee,
  }
  var condition = reqFilter ? { idEmployee: reqFilter.idEmployee } : {};

  LogTimeVacation.find(condition)
    .then(data => {
      const lastObject = data.at(-1);
      if (today > lastObject.counterUpdateDate) {
        const year = moment().add(1, 'year').format('yyyy');
        data.counterUpdateDate = moment(data.counterUpdateDate).format(year + '-MM-DD');
        LogTimeVacation.create({
          idEmployee: lastObject.idEmployee,
          date: lastObject.date,
          vacation: 0,
          sickLeave: 0,
          counterUpdateDate: data.counterUpdateDate,
          __v: 0
        }, (error, data) => {
          if (error) {
            return next(error)
          } else {
            res.json(data)
          }
        })
      } else {
        res.json('ok')
      }
    })
    .catch(err => {
      res.status(500).send({
      });
    });
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


LogTimeVacationRoute.route('/checkPassedYearSinceFirstDate').put((req, res, next) => {
  const reqFilter = {
    idEmployee: req.query.idEmployee,
  }

  let condition = reqFilter ? { idEmployee: req.query.idEmployee, counterUpdateDate: { $gt: req.query.date }, counterUpdateDate: { $gt: req.query.endDate } } : {};

  let filterByStartDay = reqFilter ? { idEmployee: req.query.idEmployee, counterUpdateDate: { $gt: req.query.date } } : {};

  var employee = reqFilter ? { idEmployee: reqFilter.idEmployee } : {};
  let firstObj;
  LogTimeVacation.find(filterByStartDay,
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        if (data) {
          firstObj = data[0];
          if (data.length != 1) {
            LogTimeVacation.findOne(condition,
              (error, data) => {
                if (error) {
                  return next(error);
                } else {
                  if (firstObj == data) {
                    res.json({
                      yearPassed: false
                    })
                  } else {
                    res.json({
                      yearPassed: true,
                      startDateSuitable: true,
                      counterUpdateDate: e.counterUpdateDate
                    })
                  }
                }
              }
            )
          } else {
            LogTimeVacation.findOne(condition,
              (error, data) => {
                if (error) {
                  return next(error);
                } else {
                  if (data) {
                    res.json({
                      yearPassed: false
                    })
                  } else {
                    res.json({
                      yearPassed: true,
                      startDateSuitable: true,
                      counterUpdateDate: e.counterUpdateDate
                    })
                  }
                }
              })
          }
        } else {
          LogTimeVacation.findOne(employee,
            (error, data) => {
              if (error) {
                return next(error);
              } else {
                if (data) {
                  res.json({
                    yearPassed: true,
                    startDateSuitable: false,
                    counterUpdateDate: data.counterUpdateDate
                  })
                }
              }
            })
        }

      }
    })
})


LogTimeVacationRoute.route('/currentRequestByEmployeeId').put((req, res, next) => {
  let today = moment().format('yyyy-MM-DD');
  const reqFilter = {
    idEmployee: req.query.idEmployee,
  }
  let condition = reqFilter ? { idEmployee: req.query.idEmployee, counterUpdateDate: { $gt: req.query.date }, counterUpdateDate: { $gt: req.query.endDate } } : {};
  let employee = reqFilter ? { idEmployee: reqFilter.idEmployee } : {};
  let conditionStartDate = reqFilter ? { idEmployee: req.query.idEmployee, counterUpdateDate: { $gt: req.query.date } } : {};

  let filterByStartDay = reqFilter ? { idEmployee: req.query.idEmployee, counterUpdateDate: { $gt: req.query.date } } : {};
  LogTimeVacation.find(filterByStartDay,
    (error, data) => {
      if (error) {
        return next(error);
      } else {
        if (data.length) {
          const firstObj = data[0];
          LogTimeVacation.findByIdAndUpdate(firstObj.id, {
            $inc: { vacation: req.body.vacation, sickLeave: req.body.sickLeave }
          }, (error, data) => {
            if (error) {
              return next(error);
            } else {
              if (data) {
                res.json(data)
              }
            }
          })
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
            })
        }
      }
    })
})


LogTimeVacationRoute.route('/currentRequestByEmployeeIdStartDateAndEndDateNotSuitable').put((req, res, next) => {

  let today = moment().format('yyyy-MM-DD');

  const reqFilter = {
    idEmployee: req.query.idEmployee,
  }

  let condition = reqFilter ? { idEmployee: req.query.idEmployee, counterUpdateDate: { $gt: req.query.date }, counterUpdateDate: { $gt: req.query.endDate } } : {};
  let employee = reqFilter ? { idEmployee: reqFilter.idEmployee } : {};


  LogTimeVacation.findOne(employee,
    (error, data) => {
      if (error) {
        return next(error);
      } else {

        let year = moment(req.query.endDate).add(1, 'year').format('yyyy');

        req.body.counterUpdateDate = moment(data.counterUpdateDate).format(year + '-MM-DD');
        LogTimeVacation.create(req.body, (error, data) => {
          if (error) {
            return next(error)
          } else {
            res.json(data)
          }
        })
      }
    })
})

LogTimeVacationRoute.route('/createNewCounterUpdateDate').post((req, res, next) => {
  const reqFilter = {
    idEmployee: req.query.idEmployee,

  }

  let conditionEndDate = reqFilter ? { idEmployee: req.query.idEmployee, counterUpdateDate: { $gt: req.query.date } } : {};

  let employee = reqFilter ? { idEmployee: reqFilter.idEmployee } : {};
  LogTimeVacation.findOneAndUpdate(conditionEndDate, {
    $inc: { vacation: req.body.vacation, sickLeave: req.body.sickLeave }
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      if (data) {
        res.json(data)
      } else {
        LogTimeVacation.findOne(employee)
          .then(data => {
            if (data) {
              const checkDate = moment(req.query.date).format('MM-DD');
              const checkFirstDate = moment(data.counterUpdateDate).format('MM-DD');
              if (checkFirstDate > checkDate) {
                const year = moment(req.query.date).format('yyyy');
                req.body.counterUpdateDate = moment(data.counterUpdateDate).format(year + '-MM-DD');
              } else {
                const year = moment(req.query.date).add(1, 'year').format('yyyy');
                req.body.counterUpdateDate = moment(data.counterUpdateDate).add(1, 'year').format(year + '-MM-DD');
              }
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

function ff() {

}


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
