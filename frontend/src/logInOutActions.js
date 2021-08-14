import jwt_decode from 'jwt-decode'

const googleSignIn = () => {
  window.location.href =
    "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&prompt=select_account&client_id=716515278040-8devcsi8fm1uh0mledpu00oknp3i3kpv.apps.googleusercontent.com&scope=openid%20profile email&redirect_uri=http://localhost:3000/login"
}

const checkToken = (setUser) => {
  const token = localStorage.getItem('token')
  if (token) setUser(jwt_decode(token))
}

const autoLogout = (setUser) => {
  const token = localStorage.getItem('token')

  if (token) {
    let date = new Date(jwt_decode(token).exp)
    date = date.getTime()

    let dateNow = new Date()
    dateNow = Number(dateNow.getTime().toString().slice(0, -3))

    if (dateNow > date) {
      localStorage.removeItem('token')
      setUser('')
      window.location.href = "http://localhost:3000"
    }
  }
}

const logout = (setUser) => {
  localStorage.removeItem('token')
  setUser('')
  window.location.href = "http://localhost:3000"
}

export {
  googleSignIn,
  checkToken,
  autoLogout,
  logout
}