const yargs = require('yargs');

const geocode = require('./geocode/geocode.js');
const weather = require('./weather/weather');

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

geocode.geoCodeAddress(argv.a, (errorMessage, results) => {
    if(errorMessage){
        console.log(errorMessage);
    }
    else{
        console.log(results.address);
        // lat = results.latitude;
        // long = results.longtitude;
        // console.log(JSON.stringify(results, undefined, 2));
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
            if(errorMessage){
                console.log(errorMessage);
            }
            else{
                console.log(`It's ${weatherResults.summary} today`);
                console.log(`Temperature is ${weatherResults.temperature} but feels like it is ${weatherResults.apparentTemperature}`);
            }
        });
    }
});    



