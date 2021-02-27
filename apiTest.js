const axios = require('axios')

const ASTROBIN_KEY = '6d6d6266a7b6d029a9d9f598f811d72dfbc4d962'
const ASTROBIN_SECRET = '0472754b2ebb8dc9770105f1d6088a5e4c206444'

console.log('ASTROBIN KEY is: ', ASTROBIN_KEY)
console.log('ASTROBIN SECRET is: ', ASTROBIN_SECRET)
axios.get(`http://astrobin.com/api/v1/image/1234&api_key=${ASTROBIN_KEY}&api_secret=${ASTROBIN_SECRET}&format=json`)
.then(res => {
    console.log('Astrobin response is: ', res)
})