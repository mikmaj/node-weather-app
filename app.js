require('dotenv').config()
const yargs = require('yargs')

const geocode = require('./geocode/geocode')
const weather = require('./weather/weather')

// Get the api keys from the .env file
const LOCATION_API_KEY = process.env.LOCATION_API_KEY
const WEATHER_API_KEY = process.env.WEATHER_API_KEY

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv

geocode.geocodeAddress(argv.address, LOCATION_API_KEY, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(results.address)
        // Send the api key, location information and callbacks to weather.js
        weather.getWeather(WEATHER_API_KEY, results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if (errorMessage) {
                console.log(errorMessage)
            } else {
                console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemp}.`)
            }
        })
    }
})



