const express = require('express');
const app = express();
const staffRoute = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require("../database/db")
const errorHandler = require("../utills/errorHandler")

let Employee = require('../model/Employee');
 

staffRoute.post('/login',async(req,res) => {
  
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
        
      })
    }else{
      res.status(401).json({
        massage: "Пароль не совпадает"
      })
    }
  }else{
    res.status(404).json({
      massage: "Пользователя нет"
    })
  }
})



staffRoute.post('/add-employee',async(req,res) => {
  const candidate = await Employee.findOne({email: req.body.email})
  if(candidate){
    res.status(409).json({
      massage:"Такой email уже занят. Попробуйте другой."
    })
  }else{
  const salt = bcrypt.genSaltSync(10)
  const password = req.body.password
  const user = new Employee({
    position: req.body.position,
    birthday: req.body.birthday,
    name: req.body.name,
    email: req.body.email,
    salary: req.body.salary,
    phone: req.body.phone,
    role:req.body.role,
    password: bcrypt.hashSync(password,salt)
  })
  try{
    await user.save()  
    res.status(201).json(user)
    res.json(data)
  }catch(e){
    errorHandler(res,e)
  }
}
})




// Get all Staff
staffRoute.route('/').get((req, res) => {
    Employee.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get employee 
staffRoute.route('/read-employee/:id').get((req, res) => {
    Employee.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update employee
staffRoute.route('/update-employee/:id').put((req, res, next) => {
    Employee.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('employer updated successfully!')
    }
  })
})

// Delete employee
staffRoute.route('/delete-employee/:id').delete((req, res, next) => {
    Employee.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = staffRoute;