const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StandartMonthHours = new Schema({
  time:{
    type: Number
  },
}, {
  collection: 'standartMonthHours'
})

module.exports = mongoose.model('StandartMonthHours', StandartMonthHours)