const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode.js')
const darksky = require('./utils/darksky.js')

const app = express()
const port = process.env.PORT || 3000

//By default the views path is the root directory with a folder called 'views'
const viewsPath = path.join(__dirname, '../templates/views')
app.set('views', viewsPath)

app.set('view engine', 'hbs')

//Register partials which are sub views to bigger views
const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath)

//This path folder contains all the hbs files
const parentDirectoryPath = path.join(__dirname, '../public')
app.use(express.static(parentDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Navneet Singh Gill'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Navneet Singh Gill'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Navneet Singh Gill'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('No address')
    }

    geocode(req.query.address, (error, {latitude, location, longitude} = {}) => {
        if (!error) {

            darksky(latitude, longitude, (error, response) => {
                if (!error) {
                    return res.send({
                        location,
                        forecast: response
                    })
                } else {
                    return res.send({ error })
                }
            })

        } else {
            return res.send({ error })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: 'Help article not found',
        name: 'Nsg'
    })
})

app.get('*', (req, res) => {
    res.render('notFound', {
        title: 'Page not found',
        name: 'Nsg'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on '+port)
})