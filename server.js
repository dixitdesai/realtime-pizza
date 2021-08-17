const path = require('path')
const express = require('express')
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const mongoose = require('mongoose')
const session = require('express-session')
require('dotenv').config()
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')

const app = express()
const PORT = process.env.PORT || 3000

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
const connection = mongoose.connection

connection.once('open', () => {
    console.log('Database connected...')
}).catch(err => {
    console.log('Connection failed...')
})

// Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoDbStore.create({
        mongoUrl: process.env.CONNECTION_URL
    }),
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 24 hours
}))

app.use(flash())
// Assets
app.use(express.static('public'))
app.use(express.json())

// Global Middleware
app.use((req, res, next) => {
    res.locals.session = req.session
    next()
})

// set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)

app.listen( 3000, () => {
    console.log(`Server is running on port ${PORT}`)
})