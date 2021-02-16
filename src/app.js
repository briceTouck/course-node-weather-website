const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)

const app = express()
const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Brice Grelet'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'About Page',
        name: 'Brice Grelet'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help Page',
        help_text: 'Helpful text !',
        name: 'Brice Grelet'
    })
})

app.get('/weather', (req, res) => {

    if(!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    console.log(req.query.address)

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{

        if(error){
            return res.send({error: error})
        }

        forecast(latitude, longitude, (error, forecastData) => {

            if(error){
                return res.send({error: error})
            }

            res.send({
                forcast : forecastData,
                location,
                address : req.query.address
            })

        })

    })


})

app.get('/help/*',(req, res) => {
    res.render('404',{
        title: 'Erreur 404',
        message: 'Help article not found',
        name: 'Brice Grelet'
    })
})

app.get('*',(req, res) => {
    res.render('404',{
        title: 'Erreur 404',
        message:'Page not found',
        name: 'Brice Grelet'
    })
})

app.listen(port, () =>{
    console.log('Server is up on port '+port)
})