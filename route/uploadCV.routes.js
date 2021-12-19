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
  const { idEmployee } = req.body;
  var bufDataFile = Buffer.from(req.files.cv.data).toString('base64')
  const imagePath = "data:application/pdf;base64," + bufDataFile;
  const dataCv = new CVFile({
    name,
    imagePath,
    idEmployee
  });
  var condition = idEmployee ? { idEmployee: req.body.idEmployee } : {};
  CVFile.findOneAndDelete(condition)
    .then(data => {
      if (data) {
          CVFile.create(dataCv, (error, data) => {
            if (error) {
              return next(error)
            } else {
              res.json(data)
            }
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

CVFileRoute.route('/getCVFileById').get((req, res) => {
  const idEmployee = req.query.idEmployee
  var condition = idEmployee ? { idEmployee: idEmployee } : {};
  CVFile.findOne(condition)
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
