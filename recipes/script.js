const items = { ...localStorage }
const tag = ['Chicken', 'Pasta', 'Dessert', 'Bread', 'Salad', 'Mexican']

const getR = async (tags, number=6) => {
    res = await axios.get(`https://api.spoonacular.com/recipes/random?number=${number}&tags=${tags}&`)
    console.log(res.data.recipes);

    const recipes = res.data.recipes


    recipes.map(r => {
        let newDiv = document.createElement('div')
        let recipeName = document.createElement('h1')
        let recipeImg = document.createElement('img')
        let recipeDesc = document.createElement('p')

        newDiv.appendChild(recipeImg)
        newDiv.appendChild(recipeName)

        newDiv.classList.add('singleRecipe')
        recipeImg.classList.add('singleRImg')
        recipeName.classList.add('singleRecipeName')

        recipeName.innerHTML = r.title
        recipeImg.src = r.image
        recipeDesc.textContent = r.summary

        document.querySelector('.recipes').appendChild(newDiv)
        
        const modal = document.querySelector('.modal')
        const span = document.querySelector('.close') 

        newDiv.addEventListener('click', () => {
            modal.style.display = 'block'
            const modalContent = document.querySelector('.modalContent')

            document.querySelector('.modalImg').src = r.image
            document.querySelector('.modalRecName').innerHTML = r.title
            document.querySelector('.modalRecDesc').innerHTML = r.summary
            console.log(r.analyzedInstructions[0].steps);

            for (let i of r.analyzedInstructions[0].steps) {
                let newStep = document.createElement('p')

                newStep.innerHTML = i.step
                
                document.querySelector('.modalRecInstruction').appendChild(newStep)
            }
            
            if (modalContent.lastChild === document.querySelector('.likeBtn')) {
                modalContent.removeChild(document.querySelector('.likeBtn'))
            }
            let btn = document.createElement('button')
            
            btn.classList.add('likeBtn')
            btn.innerHTML = 'Like'
            btn.addEventListener('click', () => {
                localStorage.setItem(r.title, r.id)
            })
            document.querySelector('.modalContent').appendChild(btn)

        })

        span.addEventListener('click', () => {
            modal.style.display = 'none'
        })

        window.onclick = e => {
            if (e.target == modal) {
                modal.style.display = 'none'
            }
        }

    })
}

const getRById = async id => {
    const res = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?&includeNutrition=false`)
    console.log(res);
    document.querySelector('.likedRec').innerHTML = document.querySelector('.likedRec').innerHTML + "<br/>" + res.data.title 
}


const removeChildren = (classSelector , recipeTag) => {
    const recipesDiv = document.querySelector('.recipes')
    document.querySelector(classSelector).addEventListener('click', () => {
        getR(recipeTag)
        while(recipesDiv.firstChild) {
            recipesDiv.removeChild(recipesDiv.lastChild)
        }
    })
}

removeChildren('.chicken', 'chicken')
removeChildren('.pasta', 'pasta')
removeChildren('.dessert', 'dessert')

document.querySelector('.liked').addEventListener('click', () => {
    for(let i in items) {
        if(items[i] != ''){
            getRById(items[i])
        }
    }
})


// getR(tag[Math.floor(Math.random() * tag.length)], 6)