const express = require('express')
const cors = require('cors')
const morgan = require('morgan') 
const mysql = require('mysql')

const app = express()

app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

app.use(require('./router'))

app.listen(8080, () => {
    console.log('server on port 8080')
})