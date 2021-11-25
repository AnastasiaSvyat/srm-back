const express = require('express');
const CVFileRoute = express.Router();
let CVFile = require('../model/CVFile');

CVFileRoute.route('/uplFile').post((req, res, next) => {
  console.log(req);
  const email = req.query.email
  var condition = email ? { email: email } : {};
  CVFile.find(condition)
    .then(data => {
      if (data.length) {
        CVFile.findByIdAndRemove(data[0]._id, () => {
          CVFile.create(req.body, (error, data) => {
            if (error) {
              return next(error)
            } else {
              res.json(data)
            }
          })
        })
      } else {
        CVFile.create(req.body, (error, data) => {
          if (error) {
            return next(error)
          } else {
            res.json(data)
          }
        })
      }
    })
});

CVFileRoute.route('/getCVFile').get((req, res) => {
  const email = req.query.email
  var condition = email ? { email: email } : {};
  CVFile.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})

CVFileRoute.route('/delete-cv/:id').delete((req, res, next) => {
  CVFile.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = CVFileRoute;
