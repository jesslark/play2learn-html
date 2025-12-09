window.addEventListener('load', e => {
  const loginForm = document.getElementById('login')
  const registerForm = document.getElementById('register')
  const loginLink = document.getElementById('login-link')
  const registerLink = document.getElementById('register-link')

  registerLink.addEventListener('click', () => {
    loginForm.style.display = "none"
    registerForm.style.display = "block"
  })

  loginLink.addEventListener('click', () => {
    loginForm.style.display = "block"
    registerForm.style.display = "none"
  })
})