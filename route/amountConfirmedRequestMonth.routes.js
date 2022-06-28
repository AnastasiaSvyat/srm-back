const express = require('express');
const amountConfirmedRequestMonthRoute = express.Router();
let AmountConfirmedRequestMonth = require('../model/amountConfirmedRequestInMonth');
var moment = require('moment')


// saveConfirmReq

amountConfirmedRequestMonthRoute.route('/amountConfirmedRequestMonth').post((req, res, next) => {
    req.body.date = moment(req.body.date).format('MM-YYYY');
    AmountConfirmedRequestMonth.findOneAndUpdate({
        idEmployee: req.body.idEmployee,
        date: req.body.date
    }, {
        // $inc: {
        //     vacation: req.body.vacation, sickLeave: req.body.sickLeave,
        //     oneToOne: req.body.oneToOne, environment: req.body.environment
        // }
    })
        .then(data => {
            console.log(data);
            if (data) {
                const a = data.request.some(element => {
                    if (element.name == req.body.request.name) {
                        console.log(element.count);
                        element.count = element.count + req.body.request.count
                        console.log(element.count);
                    }
                    return element.name == req.body.request.name
                });
                if (!a) {
                    data.request.push(req.body.request)
                }
                const updateData = data;

                AmountConfirmedRequestMonth.findByIdAndUpdate(updateData._id, {
                    $set: updateData
                }, (error, data) => {
                    if (error) {
                        return next(error);
                    } else {
                        res.json(updateData)
                    }
                })

            } else {
                AmountConfirmedRequestMonth.create(req.body, (error, data) => {
                    if (error) {
                        return next(error)
                    } else {
                        res.json(data)
                    }
                })
            }
        })
        .catch(err => {
            res.status(500).send({
            });
        });
})


// getReqCurrentUser

amountConfirmedRequestMonthRoute.route('/getRequestCurrentUser').get((req, res) => {

    // constdate = moment(req.query.date).format('MM-YYYY');
    // console.log(req.query.date);

    AmountConfirmedRequestMonth.findOne({ 
        idEmployee: req.query.idEmployee,
        date: req.query.date
     })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
        });
      });

  })



module.exports = amountConfirmedRequestMonthRoute;
