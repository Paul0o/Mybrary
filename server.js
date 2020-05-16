if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

let express = require('express')
let app = express()
let expressLayouts = require('express-ejs-layouts')

let indexRouter = require('./routes/index')

app.set('view engine','ejs')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

let mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser : true, useUnifiedTopology: true})
let db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 8080);