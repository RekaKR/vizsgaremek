import React, { useState } from 'react'
import useFetchGet from '../../../useFetchGet'
import ToDos from './ToDos'
import ToDoInput from './ToDoInput'

const ToDoAdmin = () => {
  const [resUpdate, setResUpdate] = useState(0)
  const [resDelete, setResDelete] = useState(0)
  const [resPost, setResPost] = useState('')

  const { data: toDos } = useFetchGet(true, 'http://localhost:3001/api/to-do-list', [resUpdate, resDelete, resPost])

  return (
    <div className="admin-to-dos">
      <ToDos toDos={toDos} resUpdate={resUpdate} setResUpdate={setResUpdate} resDelete={resDelete} setResDelete={setResDelete} />

      <ToDoInput resPost={resPost} setResPost={setResPost} />
    </div>
  )
}

export default ToDoAdmin