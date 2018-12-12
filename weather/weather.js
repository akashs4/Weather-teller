const request = require('request');

var getWeather = (lat, long, callback) => {
    //passing 2 args in request, one options and other arrow function
    request({
        url: `https://api.darksky.net/forecast/c3dfbb7023c661bc7690aabb0d652f8e/${lat},${long}`,
        json: true
    },(error, response, body) => {
        if(!error && response.statusCode === 200){
            callback(undefined, {
                summary: body.currently.summary,
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
                
            });
            // console.log(`Summary: ${body.currently.summary}`);
            // console.log(`Temperature: ${body.currently.temperature}`);
            // console.log(`Apparent Temperature: ${body.currently.apparentTemperature}`);
        }
        else{
            callback('Unable to fetch weather');
        }
        
    });
};

module.exports.getWeather = getWeather;