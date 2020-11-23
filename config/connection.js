const mongoose = require('mongoose');
const { mongoDB } = require('./URI');

mongoose.connect(mongoDB.URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
.then(db => console.log('base de datos online'))
.catch(err => console.log(`ocurrio un error ${err}`))