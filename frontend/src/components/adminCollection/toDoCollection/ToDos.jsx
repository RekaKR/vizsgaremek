import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ToDo from './ToDo'

const ToDos = ({ toDos, resUpdate, setResUpdate, resDelete, setResDelete }) => {
  const [done, setDone] = useState(false)
  const [updateById, setUpdateById] = useState(false)
  const [deleteById, setDeleteById] = useState('')
  const [changeUpdate, setChangeUpdate] = useState(false)
  const [changeDelete, setChangeDelete] = useState(false)

  const updateRecord = (toDo) => {
    setUpdateById(toDos.filter(item => item.key === toDo.key) && toDo._id)
    setChangeUpdate(!changeUpdate)
  }

  useEffect(() => {
    if (updateById) {
      fetch(`http://localhost:3001/api/to-do-list/${updateById}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
          done: done
        })
      }).then(res => res.json())
        .then(res => setResUpdate(resUpdate + 1))
        .catch(err => setResUpdate(false))
      //.finally(() => resetRes())
    }
  }, [changeUpdate])

  const deleteRecord = (toDo) => {
    setDeleteById(toDos.filter(item => item.key === toDo.key) && toDo._id)
    setChangeDelete(!changeDelete)
  }

  useEffect(() => {
    if (deleteById) {
      fetch(`http://localhost:3001/api/to-do-list/${deleteById}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }).then(res => res.json())
        .then(res => setResDelete(resDelete + 1))
        .catch(err => setResDelete(false))
    }
  }, [changeDelete])

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