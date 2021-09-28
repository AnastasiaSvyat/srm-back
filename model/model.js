const dbConfig = require("../database/db.js");

const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');

mongoose.Promise = global.Promise;

const dbPag = {};
dbPag.mongoose = mongoose;
dbPag.url = dbConfig.db
dbPag.employee = require("./Employee")(mongoose, mongoosePaginate);

module.exports = dbPag;
