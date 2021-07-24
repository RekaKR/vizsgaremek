import React, { useState, useEffect } from 'react'
import ToDos from '../ToDos/ToDos'
import ToDoInput from '../ToDoInput/ToDoInput'

const ToDoAdmin = () => {
  const [toDos, setToDos] = useState('')
  const [resUpdate, setResUpdate] = useState(0)
  const [resDelete, setResDelete] = useState(0)
  const [resPost, setResPost] = useState('')

  useEffect(() => {
    fetch('http://localhost:3001/to-do-list')
      .then(res => res.json())
      .then(data => setToDos(data))
      .catch(err => setToDos(null))
  }, [resUpdate, resDelete, resPost])


  const resetRes = () => {
    if (resUpdate === 10) setResUpdate(0)
    if (resDelete === 10) setResDelete(0)
  }

  return (
    <div className="admin-to-dos">
      <ToDos toDos={toDos} resetRes={resetRes} resUpdate={resUpdate} setResUpdate={setResUpdate} resDelete={resDelete} setResDelete={setResDelete} />

      <ToDoInput resPost={resPost} setResPost={setResPost} />
    </div>
  )
}

export default ToDoAdmin