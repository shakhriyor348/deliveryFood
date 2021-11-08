const auth = () => {
    const buttonAuth = document.querySelector('.button-auth'),
    modalAuth = document.querySelector('.modal-auth'),
    closeAuth = document.querySelector('.close-auth'),
    logInForm = document.querySelector('#logInForm'),
    userLogin = document.querySelector('#login'),
    userPassword = document.querySelector('#password'),
    btnOut = document.querySelector('.button-out'),
    userName = document.querySelector('.user-name'),
    buttonCart = document.querySelector('.button-cart') 


// Модалка войти
buttonAuth.addEventListener('click', () => {
    modalAuth.style = `display: flex;`
})
closeAuth.addEventListener('click', () => {
    modalAuth.style = `display: none;`
})
modalAuth.addEventListener('click', (e) => {
    if(e.target.classList.contains('modal-auth')){
        modalAuth.style = `display: none;`
    }
})

// отправка с модалки

const login = (user) => { /* Авторизация */
    buttonAuth.style.display = 'none'
    btnOut.style.display = 'flex'
    userName.style.display = 'flex'
    userName.textContent = user.login
    modalAuth.style = `display: none;`
    buttonCart.style = `display: flex;`
}


const logOut = () => {
    buttonAuth.style.display = 'flex'
    btnOut.style.display = 'none'
    userName.style.display = 'none'
    userName.textContent = ''
    localStorage.removeItem('user')
    buttonCart.style = `display: none;`
}

btnOut.addEventListener('click', () => {
    logOut()
})


logInForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const user = {
        login: userLogin.value,
        password: userPassword.value
    }

    localStorage.setItem('user', JSON.stringify(user))
    login(user)
})

if(localStorage.getItem('user')) {
    login(JSON.parse(localStorage.getItem('user')))
}
}

auth()