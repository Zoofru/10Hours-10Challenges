const allGen = async () => {
    const res = await axios.get('https://data-imdb1.p.rapidapi.com/genres/', {
        headers: {
            'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
            'x-rapidapi-key': 'e0d6a68fb8mshb704bbbc26e1f66p1ad819jsn2a844020c804'
        }
    })
    console.log(res.data.Genres);
    for(let i of res.data.Genres.splice(0, 4)) {
        let q = 2
        const newDivSplideCont = document.createElement('div')
        const newGenreTitle = document.createElement('h1')
        const newDivSplide = document.createElement('div')
        const newDivSplideTrck = document.createElement('div')
        const newUL = document.createElement('ul')
        newDivSplideCont.classList.add('splideCont')
        newDivSplide.classList.add('splide')
        newDivSplide.setAttribute('id', `splide${q}`)
        newDivSplideTrck.classList.add('splide__track')
        newUL.classList.add('splide__list')
        newUL.classList.add(i.genre)
        newGenreTitle.innerHTML = i.genre
        newGenreTitle.classList.add('genreTitle')

        newDivSplideCont.appendChild(newGenreTitle)
        newDivSplideCont.appendChild(newDivSplide)
        newDivSplide.appendChild(newDivSplideTrck)
        newDivSplideTrck.appendChild(newUL)
        document.querySelector('.caro').appendChild(newDivSplideCont)

        q += 1
        getMoviesByGen(i.genre)
    }
}

const getMoviesByGen = async genre => {
    const res = await axios.get(`https://data-imdb1.p.rapidapi.com/movie/byGen/${genre}/`, {
        headers: {
            'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
            'x-rapidapi-key': 'e0d6a68fb8mshb704bbbc26e1f66p1ad819jsn2a844020c804'
        }
    })
    //spliced so it dosent return 1500 movies for each genre
    let movies = res.data.Data.splice(0, 1);
    let movieIds = []

    for(let i of movies) {
        movieIds.push(i.imdb_id)
    }

    for(let i of movieIds) {
        getMovieById(i)
    }
}

const getMovieById = async id => {
    const res = await axios.get(`https://data-imdb1.p.rapidapi.com/movie/id/${id}/`, {
        headers: {
            'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
            'x-rapidapi-key': 'e0d6a68fb8mshb704bbbc26e1f66p1ad819jsn2a844020c804'
        }
    })
    
    //TODO: SAME MOVIE IS LOADING. NOT ALL MOVIES ARE LOADING. (FIND BETTER WAY TO CHECK GENRE BESIDES IF ITS FIRST IN LIST. CHECK FOR DUPLICATES AND ERADICATE THEM.)

    for(let i in res.data){
        const newSlide = document.createElement('li')
        let genreAdd = document.querySelector(`.${res.data[i].gen[0].genre}`)
        newSlide.classList.add('splide__slide')
        newSlide.style.backgroundImage = `url(${res.data[i].image_url})`
        newSlide.style.backgroundSize = 'cover'
        newSlide.classList.add('movieCover')

        genreAdd.appendChild(newSlide)
    }
    mountSplide()
}

// getMoviesByGen('Horror')
// allGen()


const mountSplide = () => {
    new Splide( '#splide', {
        fixedWidth: '15rem',
        height: '18%'
    }).mount()

    new Splide( '#splide2', {
        fixedWidth: '15rem',
        height: '18%'
    }).mount()
}