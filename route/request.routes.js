const express = require('express');
const requestRoute = express.Router();
var moment = require('moment')
var today = moment().format('YYYY-MM-DD');
var month = moment().format('YYYY-MM-31');
let Request = require('../model/Request');

// Add Request
requestRoute.route('/add-request').post((req, res, next) => {
  req.body.date = moment(req.body.date).format('YYYY-MM-DD');
  req.body.month = moment(req.body.date).format('MM');
  req.body.endMonth = moment(req.body.endDate).format('MM');

  Request.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get pending Request
requestRoute.route('/get-request').get((req, res) => {
  const reqFilter = {
    confirm: req.query.confirm,
    decline: req.query.decline
  }
  var condition = reqFilter ? { decline: reqFilter.decline, confirm: reqFilter.confirm } : {};
  Request.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})

requestRoute.route('/get-reqById').get((req, res) => {
  const reqFilter = {
    confirm: req.query.confirm,
    decline: req.query.decline,
    idEmployee: req.query.idEmployee
  }
  var condition = reqFilter ? { decline: reqFilter.decline, confirm: reqFilter.confirm, idEmployee: reqFilter.idEmployee, } : {};
  Request.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})

// Get Request ById
requestRoute.route('/read-request/:id').get((req, res) => {
  Request.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// confirm Req  BY   email
requestRoute.route('/true-reqById').get((req, res) => {
  const reqFilter = {
    confirm: req.query.confirm,
    idEmployee: req.query.idEmployee
  }
  var condition = reqFilter ? { confirm: reqFilter.confirm, idEmployee: reqFilter.idEmployee, } : {};
  Request.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
});

// decline request by email
requestRoute.route('/false-reqById').get((req, res) => {
  const reqFilter = {
    decline: req.query.decline,
    idEmployee: req.query.idEmployee
  }
  var condition = reqFilter ? { decline: reqFilter.decline, idEmployee: reqFilter.idEmployee, } : {};
  Request.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
});

// confirm request
requestRoute.route('/true-request').get((req, res) => {
  const confirm = req.query.confirm
  var today = moment().format('YYYY-01-01');
  var condition = confirm ? { confirm: confirm, date: { $gte: today } } : {};
  Request.find(condition).sort({ date: -1 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
});

requestRoute.route('/true-request-vacation').get((req, res) => {
  const reqFilter = {
    confirm: req.query.confirm,
    type: req.query.type
  }
  var today = moment().format('YYYY-MM-DD');
  var condition = reqFilter ? { confirm: reqFilter.confirm, date: { $gte: today }, type: reqFilter.type, } : {};
  Request.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
});


// confirm request month
requestRoute.route('/trueRequest-month').get((req, res) => {
  const reqFilter = {
    confirm: req.query.confirm,
  }
  var month = moment().format('YYYY-MM-31');
  var today = moment().format('YYYY-MM-DD');
  var condition = reqFilter ? { confirm: reqFilter.confirm, date: { $gte: today, $lte: month } } : {};
  Request.find(condition).sort({ date: 1 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
});

// confirm request later
requestRoute.route('/trueRequest-Later').get((req, res) => {
  const reqFilter = {
    confirm: req.query.confirm,
  }
  var month = moment().format('YYYY-MM-31');
  var condition = reqFilter ? { confirm: reqFilter.confirm, date: { $gt: month } } : {};
  Request.find(condition).sort({ date: 1 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
});



// confirmrequestLaterSelectEmployee
requestRoute.route('/trueRequestEmployee-Later').get((req, res) => {
  const reqFilter = {
    confirm: req.query.confirm,
    idEmployee: req.query.idEmployee
  }
  var today = moment().format('YYYY-MM-DD');
  var condition = reqFilter ? { idEmployee: reqFilter.idEmployee, confirm: reqFilter.confirm, date: { $gte: today } } : {};
  Request.find(condition).sort({ date: 1 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
});

requestRoute.route('/trueRequest-monthbyId').get((req, res) => {
  const reqFilter = {
    confirm: req.query.confirm,
    idEmployee: req.query.idEmployee
  }
  var today = moment().format('YYYY-MM-DD');
  var month = moment().format('YYYY-MM-31');
  var condition = reqFilter ? { idEmployee: reqFilter.idEmployee, confirm: reqFilter.confirm, date: { $gte: today, $lte: month }, } : {};
  Request.find(condition).sort({ date: 1 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
});

// decline request
requestRoute.route('/false-request').get((req, res) => {
  const decline = req.query.decline
  var today = moment().format('YYYY-01-01');
  var condition = decline ? { decline: decline , date: { $gte: today }} : {};
  Request.find(condition).sort({ date: -1 })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
});


// Update Request
requestRoute.route('/update-request/:id').put((req, res, next) => {
  Request.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data)
    }
  })
})

// Delete Request
requestRoute.route('/delete-request/:id').delete((req, res, next) => {
  Request.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = requestRoute;