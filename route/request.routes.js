const express = require('express');
const requestRoute = express.Router();
var moment = require('moment')
var today = moment().format('YYYY-MM-DD');
var month = moment().format('YYYY-MM-31');
let Request = require('../model/Request');

// Add Request
requestRoute.route('/add-request').post((req, res, next) => {
  req.body.date = moment(req.body.date).format('YYYY-MM-DD');
  Request.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
      console.log(data);
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

requestRoute.route('/get-reqEmail').get((req, res) => {
  const reqFilter = {
    confirm: req.query.confirm,
    decline: req.query.decline,
    email: req.query.email
  }

  var condition = reqFilter ? { decline: reqFilter.decline, confirm: reqFilter.confirm, email: reqFilter.email, } : {};

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
requestRoute.route('/true-reqEmail').get((req, res) => {

  const reqFilter = {
    confirm: req.query.confirm,
    email: req.query.email
  }

  var condition = reqFilter ? { confirm: reqFilter.confirm, email: reqFilter.email, } : {};

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
requestRoute.route('/false-reqEmail').get((req, res) => {

  const reqFilter = {
    decline: req.query.decline,
    email: req.query.email
  }

  var condition = reqFilter ? { decline: reqFilter.decline, email: reqFilter.email, } : {};

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
  var condition = confirm ? { confirm: confirm } : {};

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
    email: req.query.email
  }
  var condition = reqFilter ? { email: reqFilter.email, confirm: reqFilter.confirm, date: { $gte: today } } : {};
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
  var condition = decline ? { decline: decline } : {};

  Request.find(condition)
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
      console.log('event updated successfully!')
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