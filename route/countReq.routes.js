const express = require('express');
const countReqRoute = express.Router();

let CountRequest = require('../model/countRequest');

countReqRoute.post('/countRequest', async (req, res, next) => {
    try {
        const candidate = await CountRequest.findOne({
            idEmployee: req.body.idEmployee,
            month: req.body.month
        })
        if (candidate) {
            var condition = req.body.idEmployee ? { idEmployee: req.body.idEmployee } : {};
            CountRequest.find(condition)
                .then(data => {
                    if (data) {
                        req.body.day = req.body.day + data[0].day;
                        req.params.id = data[0]._id
                        CountRequest.findByIdAndUpdate(req.params.id, {
                            $set: req.body
                        }, (error, data) => {
                            if (error) {
                                return next(error);
                            }
                            else {
                                res.json(data)
                            }
                        })
                    }
                })
                .catch(err => {
                    res.status(500).send({
                    });
                });
        } else {
            CountRequest.create(req.body, (error, data) => {
                if (error) {
                    return next(error)
                } else {
                    res.json(data)
                }
            })
        }
    } catch (error) {
        res.status(error.response.status)
        return res.send(error.message);
    }
});

countReqRoute.route('/get-monthRequest').get((req, res) => {
    const reqFilter = {
      month: req.query.month,
    }
    var condition = reqFilter ? { month: reqFilter.month } : {};
    CountRequest.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
        });
      });
  })

module.exports = countReqRoute;
