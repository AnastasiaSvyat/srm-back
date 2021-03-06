const express = require('express');
const app = express();
const loginRoute = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require("../database/db")
const errorHandler = require("../utills/errorHandler")

let Employee = require('../model/Employee');
 
loginRoute.post('/login',async(req,res) => {
    const user = await Employee.findOne({
      email: req.body.email
    })
    if(user){
      const roleResult = bcrypt.compareSync(req.body.password, user.role)
      const passwordResult = bcrypt.compareSync(req.body.password, user.password)
    if(passwordResult){
      const token = jwt.sign({
          email: user.email,
          userId: user._id,
          role: user.role,
      },keys.jwt,{expiresIn: 60 * 60})
        res.status(200).json({
          email: user.email,
          userId: user._id,
          role: user.role,
          name:user.name,
          phone: user.phone,
          birthday: user.birthday,
          position: user.position,
          salary: user.salary,
          info: user.info,
          file:user.file,
          toDoList:user.toDoList

          


      })
      }else{
        res.status(401).json({
          massage: "Incorrect password"
        })
      }
    }else{
      res.status(404).json({
        massage: "User is not found"
      })
    }
  })

  module.exports = loginRoute;