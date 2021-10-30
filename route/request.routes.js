const express = require('express');
const app = express();
const requestRoute = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require("../database/db")
const errorHandler = require("../utills/errorHandler")

let Request = require('../model/Request');
 
// Add Request
requestRoute.route('/add-request').post((req, res, next) => {
    Request.create(req.body, (error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
    console.log(data);
  }
})
});


// Get all Request
requestRoute.route('/get-request').get((req, res) => {
  const dd = {
    confirm: req.query.confirm,
    decline : req.query.decline
  }
  console.log(dd);
  var condition = dd ? { decline:  dd.decline, confirm : dd.confirm} : {};
  
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
  const matchСheck = {
    confirm: req.query.confirm,
    decline : req.query.decline,
    email: req.query.email
  }

  var condition = matchСheck ? { decline:  matchСheck.decline, confirm : matchСheck.confirm, email:  matchСheck.email,} : {};
  
  Request.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
    });
    });
})



// Get Request 
requestRoute.route('/read-request/:id').get((req, res) => {
    Request.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

requestRoute.route('/true-reqEmail').get((req, res) => {
 
  const matchСheck = {
    confirm: req.query.confirm,
    email: req.query.email
  }

  var condition = matchСheck ? { confirm : matchСheck.confirm, email:  matchСheck.email,} : {};
  
  Request.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
    });
    });
});

requestRoute.route('/false-reqEmail').get((req, res) => {
 
  const matchСheck = {
    decline : req.query.decline,
    email: req.query.email
  }

  var condition = matchСheck ? { decline:  matchСheck.decline, email:  matchСheck.email,} : {};
  
  Request.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
    });
    });
});

requestRoute.route('/true-request').get((req, res) => {
 
  const confirm = req.query.confirm
  var condition = confirm ? { confirm:  confirm} : {};
  
  Request.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
    });
    });
});

requestRoute.route('/false-request').get((req, res) => {
 
  const decline = req.query.decline
  var condition = decline ? { decline:  decline} : {};
  
  Request.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
    });
    });
});

requestRoute.route('/trure-request/:confirm').get((req, res) => {
  Request.findById(req.params.id, (error, data) => {
  if (error) {
    return next(error)
  } else {
    res.json(data)
  }
})
})



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