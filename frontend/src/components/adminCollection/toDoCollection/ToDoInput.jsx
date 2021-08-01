import React, { useState } from 'react'
import ComboBox from '../../ComboBox/ComboBox'

const ToDoInput = ({ resPost, setResPost }) => {
  const options = ['ruha', 'dizájn', 'étel', 'egyéb']
  const [type, setType] = useState('')
  const [task, setTask] = useState('')

  const submit = () => {
    fetch('http://localhost:3001/api/to-do-list', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        type: (type === 'ruha' ? "clothes" : type === 'dizájn' ? "design" : type === 'étel' ? "food" : "other"),
        task: task,
        //  done: false
      })
    }).then(res => res.json())
      .then(res => setResPost(`${resPost}1`))
      .catch(err => setResPost(false))
  }

  return (
    <div className="to-do-input">
      {/*<div>
        <input type="text" onChange={e => setType(e.target.value)} placeholder="Típus" />
      </div>*/}

      <div>
        <ComboBox options={options} value={type} setValue={setType} label="Típus" />

        <input type="text" onChange={e => setTask(e.target.value)} placeholder="Teendő" />
      </div>

      <button disabled={!(type && task)} onClick={() => submit()}>Submit</button>
    </div>
  )
}

export default ToDoInput