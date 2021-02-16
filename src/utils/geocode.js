const request = require('request')
const log = (content) => console.log(content)

const mbAPIkey = 'pk.eyJ1IjoidGFzY2gzMDI3IiwiYSI6ImNrbDZzZGE4NTJrbXczMG1zcWk3cmRqaHEifQ.0JvuVIttEYHAvJd2B0jpKA'


const geocode = (address, callback)=>{

    const searchTerm = address
    const encodedSearchTerm = encodeURIComponent(searchTerm.trim())
    const mbQueryParam ='&limit=1'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodedSearchTerm+'.json?access_token='+mbAPIkey+mbQueryParam


    request({url, json: true}, (error, {body}) =>{
        if(error){
            callback('Unable to connect services!', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    } )
}

module.exports = geocode