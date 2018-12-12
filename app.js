require('dotenv').config()
const request = require('request')

const API_KEY = process.env.API_KEY

request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=iivisniemenkuja%204%2002260%20espoo%20finland&key=${API_KEY}`,
    json: true
}, (error, response, body) => {
    console.log(body)
})