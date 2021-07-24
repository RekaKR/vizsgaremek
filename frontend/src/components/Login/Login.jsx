import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Login = ({ checkToken }) => {
  let history = useHistory()

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())

    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        code: params.code,
      })
    }).then(res => res.json())
      .then(data => {
        if (data.message) {
          console.log(data.message)
        } else {
          localStorage.setItem('token', data.token)
          history.push("/invitation")
          checkToken()
        }
      })
    //.catch(err => console.log({ message: "Couldn't find user" }))
  }, [])

  return (
    <div className="login">

    </div>
  )
}

export default Login
