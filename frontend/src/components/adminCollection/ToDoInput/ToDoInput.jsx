import React, { useState } from 'react'

//Listák, mik vannak kész
const ToDoInput = () => {
  const [type, setType] = useState('')
  const [task, setTask] = useState('')
  const [res, setRes] = useState(false)

  const submit = () => {
    fetch('http://localhost:3001/to-do-list', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        type: type,
        task: task
      })
    }).then(res => res.json())
      .then(res => setRes(true))
      .catch(err => setRes(false))
  }

  return (
    <div className="to-do-input">
      <div>
        <input type="text" onChange={e => setType(e.target.value)} placeholder="Típus" />
      </div>

      <div>
        <input type="text" onChange={e => setTask(e.target.value)} placeholder="Teendő" />
      </div>

      <button disabled={!(type && task)} onClick={() => submit()}>Submit</button>
    </div>
  )
}

export default ToDoInput