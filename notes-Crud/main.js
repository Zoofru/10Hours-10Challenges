

const text = async () => {
    const res = await axios.get('http://localhost:3001/newnote')
    console.log(res);
}


document.querySelector('.savebtn').addEventListener('click', () => {
    text()
})