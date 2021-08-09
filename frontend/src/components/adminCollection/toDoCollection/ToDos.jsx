import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import useFetchDelete from '../../../customHooks/useFetchDelete'
import useFetchPatch from '../../../customHooks/useFetchPatch'
import ToDo from './ToDo'

const ToDos = ({ toDos, setResUpdate, setResDelete }) => {
  const [done, setDone] = useState(false)
  const [updateById, setUpdateById] = useState(false)
  const [deleteById, setDeleteById] = useState('')
  const [changeUpdate, setChangeUpdate] = useState(false)
  const [changeDelete, setChangeDelete] = useState(false)

  const patchBody = { done: done }

  const { data: deleteData } = useFetchDelete(deleteById, `http://localhost:3001/api/to-do-list/${deleteById}`, [changeDelete])
  const { data: updateData } = useFetchPatch(updateById, `http://localhost:3001/api/to-do-list/${updateById}`, patchBody, [changeUpdate])

  useEffect(() => {
    setResDelete(deleteData)
  }, [deleteData])

  useEffect(() => {
    setResUpdate(updateData)
  }, [updateData])

  const deleteRecord = (toDo) => {
    setDeleteById(toDos.filter(item => item.key === toDo.key) && toDo._id)
    setChangeDelete(!changeDelete)
  }

  const updateRecord = (toDo) => {
    setUpdateById(toDos.filter(item => item.key === toDo.key) && toDo._id)
    setChangeUpdate(!changeUpdate)
  }

  return (
    <div className="to-do">
      <h2>Teendők</h2>

      <h3>Ruha</h3>
      {
        toDos && toDos.map(toDo =>
          toDo.type === 'clothes'
          && <ToDo key={uuidv4()} toDo={toDo} updateRecord={updateRecord} setDone={setDone} deleteRecord={deleteRecord} />)
      }

      <h3>Díszlet</h3>
      {
        toDos && toDos.map(toDo =>
          toDo.type === 'design'
          && <ToDo key={uuidv4()} toDo={toDo} updateRecord={updateRecord} setDone={setDone} deleteRecord={deleteRecord} />)
      }

      <h3>Étel</h3>
      {
        toDos && toDos.map(toDo =>
          toDo.type === 'food'
          && <ToDo key={uuidv4()} toDo={toDo} updateRecord={updateRecord} setDone={setDone} deleteRecord={deleteRecord} />)
      }

      <h3>Egyéb</h3>
      {
        toDos && toDos.map(toDo =>
          !(toDo.type === 'clothes' || toDo.type === 'design' || toDo.type === 'food')
          && <ToDo key={uuidv4()} toDo={toDo} updateRecord={updateRecord} setDone={setDone} deleteRecord={deleteRecord} />)
      }
    </div >
  )
}

export default ToDos