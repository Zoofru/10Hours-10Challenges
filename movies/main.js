const allGen = () => {
    const res = axios.get('https://data-imdb1.p.rapidapi.com/genres/', {
        headers: {
            'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
            'x-rapidapi-key': 'e0d6a68fb8mshb704bbbc26e1f66p1ad819jsn2a844020c804'
        }
    }).then(res => {
        let m = res.data.Genres.splice(4, 3)
        console.log(m);
        let q = 1
        for(let i of m) {
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
    })
}

//  PREVENT ASYNC
const getMoviesByGen = genre => {
    const res = axios.get(`https://data-imdb1.p.rapidapi.com/movie/byGen/${genre}/`, {
        headers: {
            'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
            'x-rapidapi-key': 'e0d6a68fb8mshb704bbbc26e1f66p1ad819jsn2a844020c804'
        }
    }).then(res => {
        //spliced so it dosent return 1500 movies for each genre
        let movies = res.data.Data.splice(10, 10);
        let movieIds = []
        for(let i in movies) {
            if(!movieIds.includes(movies[i].imdb_id)){
                movieIds.push(movies[i].imdb_id)
            }
        }
        setMovieIds(movieIds, genre)
    })
}

const setMovieIds = (movieIds, genre) => {
    for(let i of movieIds) {
        getMovieById(i, genre)
    }
}

const getMovieById = (id, genre) => {
    const res = axios.get(`https://data-imdb1.p.rapidapi.com/movie/id/${id}/`, {
        headers: {
            'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
            'x-rapidapi-key': 'e0d6a68fb8mshb704bbbc26e1f66p1ad819jsn2a844020c804'
        }
    }).then(res => {
        for(let i in res.data){
            const newSlide = document.createElement('li')
            let genreAdd = document.querySelector(`.${genre}`)
            newSlide.classList.add('splide__slide')
            newSlide.style.backgroundImage = `url(${res.data[i].image_url})`
            newSlide.style.backgroundSize = 'cover'
            newSlide.classList.add('movieCover')

            if(genreAdd != null) {
                genreAdd.appendChild(newSlide)
            }
        }
        mountSplide()
    })
}

// getMoviesByGen('Horror')
allGen()


const mountSplide = () => {
    new Splide( '#splide1', {
        fixedWidth: '15rem',
        height: '48%'
    }).mount()

    new Splide( '#splide2', {
        fixedWidth: '15rem',
        height: '18%'
    }).mount()

    new Splide( '#splide3', {
        fixedWidth: '15rem',
        height: '18%'
    }).mount()
}