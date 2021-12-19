const express = require('express');
const loginRoute = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require("../database/db")

let Employee = require('../model/Employee');

loginRoute.post('/login', async (req, res) => {
  try {
    const user = await Employee.findOne({
      email: req.body.email
    })
    if (user) {
      const roleResult = bcrypt.compareSync(req.body.password, user.role)
      const passwordResult = bcrypt.compareSync(req.body.password, user.password)
      if (passwordResult) {
        const token = jwt.sign({
          email: user.email,
          id: user._id,
          role: user.role,
        }, keys.jwt, { expiresIn: 60 * 60 })
        res.status(200).json({
          email: user.email,
          id: user._id,
          role: user.role,
          name: user.name,
          phone: user.phone,
          date: user.date,
          position: user.position,
          salary: user.salary,
          password: user.password,
          info: user.info,
          infoUser: user.infoUser,
          lastPerf:user.lastPerf,
          skype:user.skype

        })
      } else {
        res.status(401).json({
          massage: "Incorrect password"
        })
      }
    } else {
      res.status(404).json({
        massage: "User is not found"
      })
    }
  } catch (error) {
    res.status(error.response.status)
    return res.send(error.message);
  }
})

module.exports = loginRoute;