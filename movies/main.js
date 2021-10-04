const allGen = async () => {
    const res = await axios.get('https://data-imdb1.p.rapidapi.com/genres/', {
        headers: {
            'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
            'x-rapidapi-key': 
        }
    })
    console.log(res.data.Genres);
    for(let i of res.data.Genres) {
        console.log(i.genre);
        const newDivSplide = document.createElement('div')
        const newDivSplideTrck = document.createElement('div')
        const newUL = document.createElement('ul')
        newDivSplide.classList.add('splide')
        newDivSplide.setAttribute('id', 'splide')
        newDivSplideTrck.classList.add('splide__track')
        newUL.classList.add('splide__list')
        newUL.classList.add(i.genre)

        newDivSplideTrck.appendChild(newUL)
        newDivSplide.appendChild(newDivSplideTrck)
        document.querySelector('.caro').appendChild(newDivSplide)
    }
}

const getMoviesByGen = async genre => {
    const res = await axios.get(`https://data-imdb1.p.rapidapi.com/movie/byGen/${genre}/`, {
        headers: {
            'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
            'x-rapidapi-key': 
        }
    })
    console.log(res);
}

const getMovieById = async id => {
    const res = await axios.get(`https://data-imdb1.p.rapidapi.com/movie/id/${id}/`, {
        headers: {
            'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
            'x-rapidapi-key': 
        }
    })
    console.log(res);
}

// allGen()


document.addEventListener( 'DOMContentLoaded', function () {
    new Splide( '#splide', {
        fixedWidth: '15rem',
        height: '18%'
    }).mount()

    new Splide( '#splide2', {
        fixedWidth: '15rem',
        height: '18%'
    }).mount()
} );