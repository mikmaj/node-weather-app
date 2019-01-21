const request = require('request')

const geocodeAddress = (address, API_KEY, callback) => {
    const encodedAddress = encodeURIComponent(address)
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${API_KEY}`,
        json: true
    }, (error, response, body) => {
        // Use callbacks to print error messages or the data
        if (error) {
            callback('Unable to connect to Google servers.')
        } else if (body.status === "ZERO_RESULTS") {
            callback('Invalid address.')
        } else if (body.status === "OK") {
            // Set errorMessage as undefined and return the location object
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            })
        } else {
            callback('Unknown error')
        }
    })
}

module.exports.geocodeAddress = geocodeAddress