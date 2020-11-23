const express = require('express')
require('./config/connection')
const routes = require('./routes')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()




app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', routes())

app.listen( 3001, () => console.log('escuchando puerto 3001'))