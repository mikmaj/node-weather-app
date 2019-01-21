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
    console.log(`Address: ${body.results[0].formatted_address}`)
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`)
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`)
})