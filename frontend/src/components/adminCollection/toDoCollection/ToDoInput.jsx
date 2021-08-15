import React, { useState, useEffect } from 'react'
import useFetchPost from '../../../customHooks/useFetchPost'
import ComboBox from '../../ComboBox/ComboBox'

const ToDoInput = ({ setResPost }) => {
  const options = ['ruha', 'dizájn', 'étel', 'egyéb']
  const [type, setType] = useState(options[3])
  const [task, setTask] = useState('')
  const [submit, setSubmit] = useState(true)

  const postBody = {
    type: (type === 'ruha' ? "clothes" : type === 'dizájn' ? "design" : type === 'étel' ? "food" : "other"),
    task: task
  }

  const { data } = useFetchPost((type && task), 'http://localhost:3001/api/to-do-list', postBody, [submit])

  useEffect(() => {
    setResPost(data)
  }, [data])

  return (
    <div className="to-do-input">
      <div>
        <ComboBox options={options} value={type} setValue={setType} label="Típus" />

        <input type="text" onChange={e => setTask(e.target.value)} placeholder="Teendő" />
      </div>

      <button disabled={!(type && task)} onClick={() => setSubmit(!submit)}>Submit</button>
    </div>
  )
}

export default ToDoInput