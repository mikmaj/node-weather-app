// require('dotenv').config()
// const yargs = require('yargs')

// const geocode = require('./geocode/geocode')

// // Get the api key from the .env file
// const API_KEY = process.env.API_KEY

// const argv = yargs
//     .options({
//         a: {
//             demand: true,
//             alias: 'address',
//             describe: 'Address to fetch weather for',
//             string: true
//         }
//     })
//     .help()
//     .alias('help', 'h')
//     .argv

// geocode.geocodeAddress(argv.address, API_KEY, (errorMessage, results) => {
//     if (errorMessage) {
//         console.log(errorMessage);
//     } else {
//         console.log(JSON.stringify(results, undefined, 4))
//     }
// })
require('dotenv').config()
const request = require('request')

const API_KEY_NEW = process.env.API_KEY_NEW

request({
    url: `https://api.darksky.net/forecast/${API_KEY_NEW}/61.4452417,23.8341589?units=si`,
    json: true
}, (error, response, body) => {
    if (error) {
        console.log("Unable to connect to Forecast.io servers")
    } else if (response.statusCode === 400) {
        console.log("Api key, address or URL is invalid.")
    } else if (!error && response.statusCode === 200) {
        console.log(body.currently.temperature)
    } else {
        console.log('Unable to fetch weather.')
    }

})
