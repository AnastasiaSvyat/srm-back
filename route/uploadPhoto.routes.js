const express = require('express');
const uploadPhotoRoute = express.Router();
const multer = require('multer');
let UploadPhoto = require('../model/UploadPhoto');


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

const upload = multer({ storage: storage })

uploadPhotoRoute.route('/uploadPhoto', upload.single('file')).post((req, res, next) => {
  const { name } = req.body;
  const { idEmployee } = req.body;
  var bufDataFile = Buffer.from(req.files.image.data).toString('base64')
  const imagePath = "data:image/jpeg;base64," + bufDataFile;
  const dataPhoto = new UploadPhoto({
    name,
    imagePath,
    idEmployee
  });
  UploadPhoto.find({ idEmployee: req.body.idEmployee })
    .then(data => {
      if (data.length) {
        UploadPhoto.findByIdAndRemove(data[0]._id, () => { })
        UploadPhoto.create(dataPhoto, (error, data) => {
          if (error) {
            return next(error)
          } else {
            res.json(data)
          }
        })

      } else {
        UploadPhoto.create(dataPhoto, (error, data) => {
          if (error) {
            return next(error)
          } else {
            res.json(data)
          }
        })
      }
    })
});

uploadPhotoRoute.route('/getPhotoEmployeeById').get((req, res) => {
  const idEmployee = req.query.idEmployee
  var condition = idEmployee ? { idEmployee: idEmployee } : {};
  UploadPhoto.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
      });
    });
})

uploadPhotoRoute.route('/getPhoto').get((req, res) => {
  UploadPhoto.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = uploadPhotoRoute;
