const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const Employee = new mongoose.Schema({
  name: {
    type: String
  },
  lastName: {
    type: String
  },
  position: {
    type: String
  },
  date: {
    type: String
  },
  dateWithOutYear: {
    type: String
  },
  startDate: {
    type: String
  },
  salary: {
    type: Number
  },
  phone: {
    type: Number
  },
  email: {
    type: String
  },
  image: {
    type: String
  },
  password: {
    type: String
  },
  token: {
    type: String
  },
  role: {
    type: String
  },
  skype: {
    type: String
  },
  info: {
    type: Array
  },
  infoUser: {
    type:String
  },
  lastPerf: {
    type: String
  }
}, {
  collection: 'employee'

});

Employee.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

Employee.plugin(mongoosePaginate);

const myModel = mongoose.model('employee', Employee);

myModel.paginate().then({});

module.exports = mongoose.model('Employee', Employee)