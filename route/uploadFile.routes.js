const express = require('express');
const uploadFileRoute = express.Router();
const multer = require('multer');


let UploadFile = require('../model/UploadFile');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    var filetype = '';
    if (file.mimetype === 'image/gif') {
      filetype = 'gif';
    }
    if (file.mimetype === 'image/png') {
      filetype = 'png';
    }
    if (file.mimetype === 'image/jpeg') {
      filetype = 'jpg';
    }
    cb(null, 'image-' + Date.now() + '.' + filetype);
  }
});

var upload = multer({ storage: storage });
uploadFileRoute.route('/uplFile', upload.single('file')).post((req, res, next) => {
  req.body.uplUrl = 'http://192.168.0.7:3000/images/' + req.body.name
  UploadFile.find({ email: req.query.email })
    .then(data => {
      if (data.length) {
        UploadFile.findByIdAndRemove(req.params.id, (error, data) => {
          if (error) {
            return next(error);
          } else {
            res.status(200).json({
              msg: data
            })
          }
        })
      } else {
        UploadFile.create(req.body, (error, data) => {
          if (error) {
            return next(error)
          } else {
            res.json(data)
            console.log(data);
          }
        })
      }
    })
    .catch(err => {
      res.status(500).send({
      });
    });

});

uploadFileRoute.route('/get-uplFile').get((req, res) => {
  const email = req.query.email
  var condition = email ? { email: email } : {};
  UploadFile.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})

uploadFileRoute.route('/delete-cv/:id').delete((req, res, next) => {
  UploadFile.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

uploadFileRoute.route('/fil').get((req, res) => {
  UploadFile.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = uploadFileRoute;
