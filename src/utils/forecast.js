const request = require('request')
const log = (content) => console.log(content)

const forecast = (latitude, longitude, callback) => {

    const wsAPIkey = '9dcc1010a3fceb8ab2aecc34f5645ec4'
    const wsQueryParam = '&query=' + latitude + ',' + longitude + '&unit=f'
    const url = 'http://api.weatherstack.com/current?access_key='+wsAPIkey+wsQueryParam

    log(url)

    request({url, json: true}, function (error, {body}) {

        if(error){
            callback('Unable to connect to services',undefined)
        }else if(body.error){
            callback('Unable to find datas, type something else.',undefined)
        }else{


            const locationName = body.location.name
            const temperature = body.current.temperature
            const windSpeed = body.current.wind_speed
            const precipitation = body.current.precip
            const description = body.current.weather_descriptions[0]
            const resume = "Il fait "+temperature+"°C, la précipitation est de "+precipitation+" et la vitesse du vent est de "+windSpeed+" mph."

            callback(undefined, {
                locationName: locationName,
                temperature: temperature,
                windSpeed: windSpeed,
                precipitation: precipitation,
                description: description,
                resume: resume
            })
        }
    });

}

module.exports = forecast