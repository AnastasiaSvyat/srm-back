const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TechnologyStack = new Schema({
    
technologyName:{
    type: String
},

}, {
  collection: 'technologyStack'
})

module.exports = mongoose.model('TechnologyStack', TechnologyStack)