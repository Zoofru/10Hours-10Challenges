const inputCity = document.querySelector('.inputCity')
const weatherInfo = document.querySelector('.weatherInfo')

const getForcastCity = city => {
    let forecast = {}
    let forecastKeys = Object.keys(forecast)
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=`)
    .then(res => res.json())
    .then(data => {
        data.list.forEach(item => {
            if(!forecastKeys.includes(item.dt_txt.slice(0, 10))) {
                    forecast[item.dt_txt.slice(0,10)] = item.main.temp
            }
        });
        console.log(forecast);
        while(weatherInfo.firstChild) {
            weatherInfo.removeChild(weatherInfo.lastChild)
        }
        for(let i in forecast){
            console.log(i);
            const newDiv = document.createElement('div')
            const newDay = document.createElement('p')
            const newTemp = document.createElement('p')

            newDiv.classList.add('dayDiv')
            newDay.textContent = i.slice(5)
            newTemp.innerHTML = Math.floor(forecast[i]) + "<span>&#176;</span>"

            newDiv.appendChild(newDay)
            newDiv.appendChild(newTemp)

            weatherInfo.appendChild(newDiv)
        }
     })
}

const getCurrentWeather = city => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=`)
    .then(res => res.json())
    .then(data => {
        document.querySelector('.cityName').textContent = data.name
        document.querySelector('.temp').innerHTML = Math.floor(data.main.temp) + "<span>&#176;</span>"
        document.querySelector('.sky').textContent = data.weather[0].main
    })
    getPhoto(city)
    getForcastCity(city)
}

const getPhoto = query => {
    fetch(`https://api.pexels.com/v1/search?query=${query}`, {
        headers: {
            Authorization: 
        }
    })
    .then(res => res.json())
    .then(data => {
        document.querySelector('.topOfCard').style.backgroundImage = `url(${data.photos[0].src.original})`
    })
}

inputCity.addEventListener('focus', () => {
    inputCity.placeholder = ''
})

inputCity.addEventListener('focusout', () => {
    inputCity.placeholder = 'Search A City...'
})

document.querySelector('.formInput').addEventListener('submit', e => {
    e.preventDefault()
    getCurrentWeather(inputCity.value)
    inputCity.value = ''
})

getCurrentWeather('miami')
