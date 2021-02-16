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
            const precipitation = body.current.precip
            const description = body.current.weather_descriptions[0]
            const resume = description+": À "+locationName+" Il fait "+temperature+"°C et la probabilité qu'il pleuve est de "+precipitation

            callback(undefined, {
                locationName: locationName,
                temperature: temperature,
                precipitation: precipitation,
                description: description,
                resume: resume
            })
        }
    });

}

module.exports = forecast