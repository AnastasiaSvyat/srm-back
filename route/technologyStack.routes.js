const express = require('express');
const technologyStackRoute = express.Router();

let TechnologyStackList = require('../model//technologyStack');

// createTechnology

technologyStackRoute.route('/createTechnology').post((req, res, next) => {
    TechnologyStackList.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
});

// ALL Technology

technologyStackRoute.route('/getAllTechnology').get((req, res) => {
    TechnologyStackList.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            });
        });
})

//get Technology By Id

technologyStackRoute.route('/getTechnologyById/:id').get((req, res) => {
    TechnologyStackList.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.json(data)
        }
    })
})

// update Technology

technologyStackRoute.route('/updateTechnology/:id').put((req, res, next) => {
    TechnologyStackList.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
        }
    })
})


// Delete Technology

technologyStackRoute.route('/deleteTechnology/:id').delete((req, res, next) => {
    TechnologyStackList.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

module.exports = technologyStackRoute;
