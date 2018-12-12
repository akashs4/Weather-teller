const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
    .options({
        a:{
            demand:true,
            alias:'address',
            describe:'Address to fecth weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geoCodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=KzMqVOXlfzbJKVJVELQAGs6iKb04Ji7W&location=${encodedAddress}`;

axios.get(geoCodeUrl).then((response) => {
    if(response.data.results[0].locations[0].geocodeQualityCode[2] === 'X'){
        throw new Error('Bad Input Address');
    }

    var lat = response.data.results[0].locations[0].latLng.lat;
    var lng = response.data.results[0].locations[0].latLng.lng;

    var weatherUrl = `https://api.darksky.net/forecast/c3dfbb7023c661bc7690aabb0d652f8e/${lat},${lng}`;

    return axios.get(weatherUrl);
    
})
.then((response) => {
    var summary = response.data.currently.summary;
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;

    console.log(`Sumary: ${summary}`);
    console.log(`Temperature: ${temperature}`);
    console.log(`Apparent Temperature: ${apparentTemperature}`);
    
})
.catch((err) => {
    if(err.code === 'ENOTFOUND'){
        console.log("Unable to connect to API servers");
    }
    else{
        console.log(err.message);
    }
});