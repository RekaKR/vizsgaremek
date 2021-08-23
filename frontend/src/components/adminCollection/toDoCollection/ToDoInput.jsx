import React, { useState, useEffect } from 'react'
import useFetchPost from '../../../customHooks/useFetchPost'

import ComboBox from '../../elementsCollection/ComboBox/ComboBox'
import Inp from '../../elementsCollection/Inp/Inp'

const ToDoInput = ({ setResPost }) => {
  const options = ['ruha', 'díszlet', 'étel', 'egyéb']
  const [type, setType] = useState(options[3])
  const [task, setTask] = useState('')
  const [submit, setSubmit] = useState(true)

  const postBody = {
    type: (type === 'ruha' ? "clothes" : type === 'díszlet' ? "design" : type === 'étel' ? "food" : "other"),
    task: task
  }

  const { data } = useFetchPost((type && task), 'http://localhost:3001/api/to-do-list', postBody, [submit])

  useEffect(() => {
    setResPost(data)
  }, [data])

  return (
    <div className="to-do-input">
      <h3>Új teendő hozzáadása</h3>
      <p>Add meg az új teendő adatait!</p>

      <div>
        <ComboBox classN="timeline-i" options={options} value={type} setValue={setType} label="Típus" />
        <Inp classN="timeline-i" label="Teendő" value={task} setValue={setTask} />
      </div>

      <button className="send-button" disabled={!(type && task)} onClick={() => setSubmit(!submit)}>Küldés</button>
    </div>
  )
}

export default ToDoInput