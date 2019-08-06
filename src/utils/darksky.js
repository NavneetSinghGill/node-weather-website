const request = require('request')

const darksky = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/7bac35a913714663b628e8addccf1bcc/' + latitude + ',' + longitude + '?units=si'

    request({url, json: true}, (error, {body}) => {
        if (!error) {
            const currently = body.currently
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + currently.temperature + ' degrees out. There is a ' + currently.precipProbability + '% chance of rain.')
        } else {
            callback('Something went wrong while processing darksky.', undefined)
        }
    })
}

module.exports = darksky