let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  mongoDb = require('./database/db');
  
const fileUpload = require('express-fileupload');
const mongoosePaginate = require('mongoose-paginate-v2');


mongoose.Promise = global.Promise;
mongoose.connect(mongoDb.db, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(() => {
    console.log('Database sucessfully connected ')
  },
  error => {
    console.log('Database error: ' + error)
  }
)
const staffRoute = require('./route/staff.routes')
const eventRoute = require('./route/events.routes')
const authRoute = require('./route/auth.routes')
const uploadFile = require('./route/uploadFile.routes')
const requestRoute = require('./route/request.routes')
const toDoListRoute = require('./route/toDoList.routes')





const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use(fileUpload());


// Static directory path
app.use(express.static(path.join(__dirname, 'dist/srm-master')));


// API root
app.use('/api', staffRoute)
app.use('/api', eventRoute)
app.use('/api', authRoute)
app.use('/api', uploadFile)

app.use('/api', requestRoute)

app.use('/api', toDoListRoute)





// PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Listening on port ' + port)
})

// 404 Handler
app.use((req, res, next) => {
  next(createError(404));
});

// Base Route
app.get('/', (req, res) => {
  res.send('invaild endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/my-first-app/index.html'));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});