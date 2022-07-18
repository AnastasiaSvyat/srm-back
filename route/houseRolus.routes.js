const express = require('express');
const houseRulesRoute = express.Router();
const multer = require('multer');

let HouseRules = require('../model/HouseRules');


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

houseRulesRoute.route('/uploadHouseRules', upload.single('file')).post((req, res, next) => {
    const { name } = req.body;

    var bufDataFile = Buffer.from(req.files.houseRules.data).toString('base64')
    const filePath = "data:application/pdf;base64," + bufDataFile;
    const dataHouseRules = new HouseRules({
      filePath,
    });

    HouseRules.findOneAndDelete()
    .then(data => {
      if (data) {
        HouseRules.create(dataHouseRules, (error, data) => {
          if (error) {
            return next(error)
          } else {
            res.json(data)
          }
        })
      } else {
        HouseRules.create(dataHouseRules, (error, data) => {
          if (error) {
            return next(error)
          } else {
            res.json(data)
          }
        })
      }
    })
});



  houseRulesRoute.route('/getHouseRules').get((req, res) => {
    HouseRules.findOne()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
        });
      });
  })
  


houseRulesRoute.route('/deleteHouseRules/:id').delete((req, res, next) => {
    HouseRules.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })


module.exports = houseRulesRoute;
