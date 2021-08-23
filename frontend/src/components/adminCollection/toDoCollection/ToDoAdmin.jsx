import React, { useState } from 'react'
import useFetchGet from '../../../customHooks/useFetchGet'

import ToDos from './ToDos'
import ToDoInput from './ToDoInput'

const ToDoAdmin = () => {
  const [resUpdate, setResUpdate] = useState(0)
  const [resDelete, setResDelete] = useState(0)
  const [resPost, setResPost] = useState('')

  const { data: toDos } = useFetchGet(true, 'http://localhost:3001/api/to-do-list', [resUpdate, resDelete, resPost])

  return (
    <div className="admin-to-dos">
      <h2>Teendők</h2>

      <div className="to-do-container">
        <ToDos toDos={toDos} resUpdate={resUpdate} setResUpdate={setResUpdate} resDelete={resDelete} setResDelete={setResDelete} />

        <ToDoInput setResPost={setResPost} />
      </div>
    </div>
  )
}

export default ToDoAdmin