const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let AmountConfirmedRequestMonth = new Schema({
    
  idEmployee:{
    type: String
  },
  date:{
    type: String
  },
  request:{
    type: Array
  },
  // sickLeave:{
  //   type: Number
  // },
  // vacation:{
  //   type: Number
  // },
  // oneToOne:{
  //   type: Number
  // },
  // environment:{
  //   type: Number
  // },

}, {
  collection: 'amountConfirmedRequestMonth'
})

module.exports = mongoose.model('AmountConfirmedRequestMonth', AmountConfirmedRequestMonth)