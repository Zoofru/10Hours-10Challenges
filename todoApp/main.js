const todoForm = document.querySelector('.todoForm')

todoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(todoForm.elements['todo'].value);
    todoForm.elements['todo'].value = ''
})