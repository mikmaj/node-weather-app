require('dotenv').config()
const yargs = require('yargs')

const geocode = require('./geocode/geocode')

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

geocode.geocodeAddress(argv.address, API_KEY, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results, undefined, 4))
    }
})