const express = require('express')
const cors = require('cors')
const morgan = require('morgan') 
const mysql = require('mysql')

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
// //Database connection
// app.use(function(req, res, next) {
//     res.locals.connection = mysql.createConnection({
//       host: "localhost",
//       user: "MyLittleNotes",
//       password: "12345",
//       database: "my-little-notes"
//     });
//     app.locals.connect();
//     next();
//   });

app.use(require('./router'))

app.listen(8080, () => {
    console.log('server on port 8080')
})