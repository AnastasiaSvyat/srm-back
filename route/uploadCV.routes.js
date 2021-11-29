const express = require('express');
const CVFileRoute = express.Router();
let CVFile = require('../model/CVFile');
const multer = require('multer');

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images');
  },
  filename: (req, file, cb) => {
    var filetype = '';
    if (file.mimetype === 'image/pdf') {
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

const upload = multer({ storage: storage })

CVFileRoute.route('/uplFile', upload.single('file')).post((req, res, next) => {
  const { name } = req.body;
  const { email } = req.body;
  console.log('f',req.files);
  var bufDataFile = Buffer.from(req.files.cv.data).toString('base64')
  const imagePath = "data:application/pdf;base64," + bufDataFile;
  const dataCv = new CVFile({
    name,
    imagePath,
    email
  });
  var condition = email ? { email: req.body.email } : {};
  CVFile.find(condition)
    .then(data => {
      if (data.length) {
        CVFile.findByIdAndRemove(data[0]._id, () => {
          CVFile.create(dataCv, (error, data) => {
            if (error) {
              return next(error)
            } else {
              res.json(data)
            }
          })
        })
      } else {
        CVFile.create(dataCv, (error, data) => {
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
