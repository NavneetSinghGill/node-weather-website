const request = require('request')

const geocode = (locationName, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(locationName) +'.json?access_token=pk.eyJ1IjoibmF2bmVldDEwNSIsImEiOiJjanluZTdja2YwaG5nM2Ntb29ucHFhNWk0In0.VEfgZcBixLqRQ-tWEinbwA&limit=1'

    request({url, json: true}, (error, {body}) => {
        if (!error && body.features.length != 0) {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        } else {
            callback('Something went wrong while quering geocode.', undefined)
        }
    })
}

module.exports = geocode