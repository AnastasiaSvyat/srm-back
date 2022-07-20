const express = require('express');
const positionListRoute = express.Router();

let PositionList = require('../model/positionsList');

// createPosition

positionListRoute.route('/createPosition').post((req, res, next) => {
    PositionList.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// ALL Position

positionListRoute.route('/getAllPositions').get((req, res) => {
    PositionList.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            });
        });
})

//getPositionById

positionListRoute.route('/getPositionById/:id').get((req, res) => {
    PositionList.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// updatePosition

positionListRoute.route('/updatePosition/:id').put((req, res, next) => {
    PositionList.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
        }
    })
})


// Delete Position

positionListRoute.route('/deletePosition/:id').delete((req, res, next) => {
    PositionList.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = positionListRoute;
