const getWeatherCity = city => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bde409744d7138aa540d646fc3f1c32d`)
    .then(res => res.json())
    .then(data => console.log(data))
}

const photo = query => {
    fetch(`https://api.pexels.com/v1/search?query=${query}`, {
        headers: {
            Authorization: 
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data.photos[1].src.original)
        document.querySelector('.topOfCard').style.backgroundImage = `url(${data.photos[0].src.original})`
    })
}

photo('hawaii')

document.querySelector('.inputCity').addEventListener('focus', () => {
    document.querySelector('.inputCity').placeholder = ''
})

document.querySelector('.inputCity').addEventListener('focusout', () => {
    document.querySelector('.inputCity').placeholder = 'Search A City...'
})