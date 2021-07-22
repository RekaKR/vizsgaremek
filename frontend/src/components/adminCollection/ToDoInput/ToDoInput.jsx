import React, { useState } from 'react'

//Listák, mik vannak kész
const ToDoInput = () => {
  const [type, setType] = useState('')
  const [task, setTask] = useState('')
  const [done, setDone] = useState(false)
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
        task: task,
        done: done
      })
    }).then(res => res.json())
      .then(res => setRes(true))
      .catch(err => setRes(false))
  }

  return (
    <div className="to-do-input">
      <div>
        <input type="text" onChange={e => setType(e.target.value)} placeholder="típus" />
      </div>

      <div>
        <input type="text" onChange={e => setTask(e.target.value)} placeholder="Teendő" />
      </div>

      <button disabled={!(type && task)} onClick={() => submit()}>Submit</button>
    </div>
  )
}

export default ToDoInput
/*
<p>Öltöny</p>
      <p>Menasszonyi ruha</p>
      <p>Csokor</p>
      <p>Gyűrű</p>

      <p>Díszítés</p>
      <p>Virágok</p>
      <p>Teríték</p>

      <p>Előétel</p>
      <p>Főétel</p>
      <p>Desszert</p>
      <p>Torta</p>
      <p>Hajnali kaja</p>
      <p>Másnapi brunch</p>
*/