import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { checkToken } from "../../logInOutActions"
import { ProfileContext } from '../../ProfileContext'

const Login = () => {
  let history = useHistory()
  const { setUser } = useContext(ProfileContext)

  const [isShow, setIsShow] = useState("Loading...")

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search)
    const params = Object.fromEntries(urlSearchParams.entries())

    fetch('http://localhost:3001/api/login', {
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
          setIsShow(data.message)
          setTimeout(() => history.push("/"), 5000)
        } else {
          localStorage.setItem('token', data.token)
          checkToken(setUser)
          history.push("/")
        }
      })
  }, [])

  return (
    <div className="login">
      {isShow}
    </div>
  )
}

export default Login
