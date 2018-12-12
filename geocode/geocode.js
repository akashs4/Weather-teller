const request = require('request');

var geoCodeAddress = (address, callback) => {
    var encodedAddress = encodeURIComponent(address);
    // console.log(encodedAddress);
    request({
        url:`http://www.mapquestapi.com/geocoding/v1/address?key=KzMqVOXlfzbJKVJVELQAGs6iKb04Ji7W&location=${encodedAddress}`,
        json: true
    }, (error, response, body) =>{
        //third arg in json.stringify() method specifies how far the content is from left margin
        // console.log(JSON.stringify(body, undefined, 2));
        // console.log(`error: ${JSON.stringify(error, undefined, 2)}`);
        //response object has 4 parts, statuscode, body, headers and request
        // console.log(`response: ${JSON.stringify(response, undefined, 2)}`);
        if(error){
            callback('Unable to connect to API');
            // console.log('Unable to connect to API');
        }
        else if(body.results[0].locations[0].geocodeQualityCode[2] === 'X'){
            callback('Bad input address');
            //console.log('Bad input address');
        }
        else{
            callback(undefined, {
                address : body.results[0].providedLocation.location,
                latitude : body.results[0].locations[0].latLng.lat,
                longitude : body.results[0].locations[0].latLng.lng
            });
            // console.log(`Provided Location is: ${body.results[0].providedLocation.location}`);
            // console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
            // console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`);
        }
    });
}

module.exports = {
    geoCodeAddress
}