import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

const Login = ({ checkToken }) => {
  let history = useHistory()

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
          history.push("/")
          //setIsShow(data.message)
          console.log(data.message)
        } else {
          localStorage.setItem('token', data.token)
          history.push("/")
          checkToken()
        }
      })
    //.catch(err => console.log({ message: "Couldn't find user" }))
  }, [])

  return (
    <div className="login">
      {isShow}
    </div>
  )
}

export default Login
