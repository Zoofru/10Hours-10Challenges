
let score = 0
const qOneSolution = 10
const qTwoSolution = 15


document.querySelector('.btnsubmitq1').addEventListener('click', () => {
    document.querySelector('.q1').classList.add('hidden')

    let qOneAnswer = document.querySelector('#q1answer').value
    console.log(qOneAnswer);
    if(qOneAnswer == qOneSolution) {
        score += 1
    }

    document.querySelector('.q2').classList.remove('hidden')
})

document.querySelector('.btnsubmitq2').addEventListener('click', () =>  {
    document.querySelector('.q2').classList.add('hidden')

    let qTwoAnswer = document.querySelector('#q2answer').value
    if(qTwoAnswer == qTwoSolution) {
        score += 1
    }

    document.querySelector('.score').classList.remove('hidden')
    document.querySelector('.scorenum').innerHTML = score
})

//42min