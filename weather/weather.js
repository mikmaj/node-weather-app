const request = require('request')

let getWeather = (WEATHER_API_KEY, lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/${WEATHER_API_KEY}/${lat},${lng}?units=si`,
        json: true
    }, (error, response, body) => {
        // Use callbacks to print error messages or the weather data
        if (error) {
            callback("Unable to connect to Forecast.io servers")
        } else if (response.statusCode === 400) {
            callback("Api key, address or URL is invalid.")
        } else if (!error && response.statusCode === 200) {
            // Set errorMessage as undefined and return the weather object
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemp: body.currently.apparentTemperature
            })
        } else {
            callback('Unable to fetch weather.')
        }

    })
}

module.exports.getWeather = getWeather
