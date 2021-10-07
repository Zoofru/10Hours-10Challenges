const form = document.querySelector('.uForm')
const prof = document.querySelector('.prof')
const API = 'https://api.github.com/users'

const getUser = async username => {
    const res = await axios.get(`${API}/${username}`)
    console.log(res.status);
    let info = {}
    info['username'] = res.data.login
    info['followers'] = res.data.followers
    info['following'] = res.data.following
    info['repos'] = res.data.public_repos
    
    prof.addEventListener('click', () => {
        window.location = res.data.html_url
    })
    if(res.status === 200) {
        while(prof.firstChild) {
            prof.removeChild(prof.firstChild)
        }
    }
    setupImage(res.data.avatar_url)
    setupInfo(info)
}

const setupImage = src => {
    const profImg = document.createElement('div')
    const newImg = document.createElement('img')
    newImg.src = src
    newImg.style.height = '55%'
    newImg.style.borderRadius = '50%'
    newImg.style.border = '15px solid #2E2A68'
    profImg.classList.add('profImg')

    profImg.appendChild(newImg)
    document.querySelector('.prof').appendChild(profImg)
}

const setupInfo = info => {
    const profInfo = document.createElement('div')
    const folRepo = document.createElement('div')
    const username = document.createElement('h1')
    const followers = document.createElement('p')
    const following = document.createElement('p')
    const repos = document.createElement('p')

    username.innerHTML = info.username
    followers.innerHTML = info.followers + ' Followers'
    following.innerHTML = "<span class='following'>" + info.following + ' Following</span>'
    repos.innerHTML = "<span class='repos'>" + info.repos + ' Repos</span>'
    folRepo.classList.add('stats')

    profInfo.appendChild(username)
    folRepo.appendChild(followers)
    folRepo.appendChild(following)
    folRepo.appendChild(repos)
    profInfo.appendChild(folRepo)

    document.querySelector('.prof').appendChild(profInfo)

}


form.addEventListener('submit', e => {
    e.preventDefault()
    getUser(document.querySelector('.user').value)
    document.querySelector('.user').value = ''

})
getUser('MBush-96')