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
    Request.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
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