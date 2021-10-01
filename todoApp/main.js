const todoForm = document.querySelector('.todoForm')

todoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const newDiv = document.createElement('div')
    const newItem = document.createElement('h2')
    const rmBtn = document.createElement('button')
    newItem.innerHTML = todoForm.elements['todo'].value
    rmBtn.textContent = 'X'
    newItem.classList.add('todoItem')
    newDiv.classList.add('todoDiv')
    rmBtn.classList.add('todoClose')
    newDiv.appendChild(newItem)
    newDiv.appendChild(rmBtn)

    rmBtn.addEventListener('click', () => {
        document.querySelector('.todo').removeChild(newDiv)
        const items = { ...localStorage }
        for (let i in items) {
            if(items[i] === newItem.textContent) {
                localStorage.removeItem(i)
            }
        }
    })

    newItem.addEventListener('click', () => {
        if(!newItem.classList.contains('completedItem')) {
            newItem.classList.add('completedItem')
        } else {
            newItem.classList.remove('completedItem')
        }
    })

    document.querySelector('.todo').appendChild(newDiv)

    addToStorage(todoForm.elements['todo'].value)
    todoForm.elements['todo'].value = ''
})

const addToStorage = (todoValue) => {
    const items = { ...localStorage }
    let currentKeys = Object.keys(items);
    let usableKeys = []

    for(let i of currentKeys) {
        if(i.slice(-2) == 'tq') {
            usableKeys.push(i)
        }
    }
    if(usableKeys.length === 0) {
        localStorage.setItem('0tq', todoValue)
    } else {
        localStorage.setItem(usableKeys.length+1 +'tq', todoValue)
    }
}

const displayAllTodos = () => {
    const items = { ...localStorage }
    let currentKeys = Object.keys(items);
    let keys = []

    for(let i of currentKeys) {
        if(i.slice(-2) == 'tq') {
            keys.push(i)
        }
    }

    for(let i of keys) {
        console.log(localStorage.getItem(i));
        const todoItem = document.createElement('h2')
        const newDiv = document.createElement('div')
        const rmBtn = document.createElement('button')
        todoItem.innerHTML = localStorage.getItem(i)
        rmBtn.textContent = 'X'
        todoItem.classList.add('todoItem')
        newDiv.classList.add('todoDiv')

        newDiv.appendChild(todoItem)
        newDiv.appendChild(rmBtn)

        rmBtn.addEventListener('click', () => {
            document.querySelector('.todo').removeChild(newDiv)
            for (let i in items) {
                if(items[i] === todoItem.textContent) {
                    localStorage.removeItem(i)
                }
            }
        })

        document.querySelector('.todo').appendChild(newDiv)
    }
}

displayAllTodos()