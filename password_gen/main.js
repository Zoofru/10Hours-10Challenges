const form = document.querySelector('.pGForm')
const inputs = document.querySelectorAll('.pGFormChild')

let length = 20
let incUpC = false
let incLowC = false
let incNum = false
let incSymb = false

document.querySelector('.clipboard').addEventListener('click', () => {
    navigator.clipboard.writeText(document.querySelector('.pass').textContent)
    .then(() => {
        alert('Copied to clipboard.');
    })
})

form.addEventListener('submit', e => {
    e.preventDefault()
    inputs.forEach(i => {
        for(let x of i.children) {
            switch(x.name) {
                case 'length':
                    length = x.value
                    x.value = ''
                    break;
                case 'iUC':
                    incUpC = x.checked
                    x.checked = false
                    break;
                case 'iLC':
                    incLowC = x.checked
                    x.checked = false
                    break;
                case 'iNum':
                    incNum = x.checked
                    x.checked = false
                    break;
                case 'iSymbols':
                    incSymb = x.checked
                    x.checked = false
                    break;
                default:
                    break;
            }
        }
    })
    createPass()
})

const randSymbol = _ => {
    const symbols = '!@#$%^&*()'
    return symbols[Math.floor(Math.random() * symbols.length)]
}

const randUpperChar = _ => {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

const randLowerChar = _ => {
    return randUpperChar().toLowerCase()
}

const randNum = _ => {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

const createPass = _ => {
    const randFunc = [randSymbol, randUpperChar, randLowerChar, randNum]
    let pass = []
    for(let i = 1; i <= length; i++) {
        pass.push(randFunc[Math.floor(Math.random() * randFunc.length)]());
    }
    document.querySelector('.pass').textContent = pass.join('')
}