import React, { useState } from 'react'

const ToDoInput = ({ resPost, setResPost }) => {
  const [type, setType] = useState('')
  const [task, setTask] = useState('')

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
        //  done: false
      })
    }).then(res => res.json())
      .then(res => setResPost(`${resPost}1`))
      .catch(err => setResPost(false))
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