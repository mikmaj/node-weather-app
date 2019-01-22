require('dotenv').config()
const yargs = require('yargs')
const axios = require('axios')

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

const encodedAddress = encodeURIComponent(argv.address)
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${LOCATION_API_KEY}`

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.')
    }
    const lat = response.data.results[0].geometry.location.lat
    const lng = response.data.results[0].geometry.location.lng
    const weatherUrl = `https://api.darksky.net/forecast/${WEATHER_API_KEY}/${lat},${lng}?units=si`
    console.log(response.data.results[0].formatted_address)
    return axios.get(weatherUrl)
}).then((response) => {
    const temperature = response.data.currently.temperature
    const apparentTemperature = response.data.currently.apparentTemperature
    console.log(`The current temperature is ${temperature}°C. It feels like ${apparentTemperature}°C`)
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.')
    } else {
        console.log(e.message)
    }
})