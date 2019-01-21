require('dotenv').config()
const request = require('request')
const yargs = require('yargs')

// Get the api key from the .env file
const API_KEY = process.env.API_KEY

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

const address = encodeURIComponent(argv.a)

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`,
    json: true
}, (error, response, body) => {
    // Print the address, latitude and longitude from the body
    if (error) {
        console.log('Unable to connect to Google servers.')
    } else if (body.status === "ZERO_RESULTS") {
        console.log('Invalid address.')
    } else if (body.status === "OK") {
        console.log(`Address: ${body.results[0].formatted_address}`)
        console.log(`Latitude: ${body.results[0].geometry.location.lat}`)
        console.log(`Longitude: ${body.results[0].geometry.location.lng}`)
    } else {
        console.log('Unknown error')
    }

})