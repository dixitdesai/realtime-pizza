const path = require('path')
const express = require('express')
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.static('public'))

// set Template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/cart', (req, res) => {
    res.render('customers/cart')
})

app.get('/login', (req, res) => {
    res.render('auth/login.ejs')
})

app.get('/register', (req, res) => {
    res.render('auth/register.ejs')
})

app.listen( 3000, () => {
    console.log(`Server is running on port ${PORT}`)
})