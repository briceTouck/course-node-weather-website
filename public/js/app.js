const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')



weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Chargement...'
    messageTwo.textContent = ''

    const url = '/weather?address='+location

    fetch(url).then((response) => {
        response.json().then((data) =>{
            if(data.error){
                messageOne.textContent = 'Error: '+ data.error
            }else{
                const location = data.location
                const forecast = data.forcast

                messageOne.textContent = 'À '+location
                messageTwo.textContent = forecast.resume


            }
        })
    })

})