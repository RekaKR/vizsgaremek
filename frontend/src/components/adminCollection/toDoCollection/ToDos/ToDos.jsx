import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ToDoItem from '../ToDoItem.jsx/ToDoItem'

//todoadminba rakni, vagy ide?
const ToDos = ({ toDos, resetRes, resUpdate, setResUpdate, resDelete, setResDelete }) => {
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [done, setDone] = useState(false)
  const [updateById, setUpdateById] = useState(false)
  const [deleteById, setDeleteById] = useState('')
  const [changeUpdate, setChangeUpdate] = useState(false)
  const [changeDelete, setChangeDelete] = useState(false)
  //const clothesList = toDos && toDos.filter(toDo => toDo.type === 'clothes')
  //const designList = toDos && toDos.filter(toDo => toDo.type === 'design')
  //const foodList = toDos && toDos.filter(toDo => toDo.type === 'food')
  //const otherList = toDos && toDos.filter(toDo => !(toDo.type === 'clothes' || toDo.type === 'design' || toDo.type === 'food'))

  const updateRecord = (toDo) => {
    setCheckboxValue(!checkboxValue)
    setUpdateById(toDos.filter(item => item.key === toDo.key) && toDo._id)
    setChangeUpdate(!changeUpdate)
  }

  useEffect(() => {
    if (deleteById) {
      fetch(`http://localhost:3001/to-do-list/${updateById}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({
          done: done
        })
      }).then(res => res.json())
        .then(res => setResUpdate(resUpdate + 1))
        .catch(err => setResUpdate(false))
        .finally(() => resetRes())
    }
  }, [changeUpdate])

  const deleteRecord = (toDo) => {
    setDeleteById(toDos.filter(item => item.key === toDo.key) && toDo._id)
    setChangeDelete(!changeDelete)
  }

  useEffect(() => {
    fetch(`http://localhost:3001/to-do-list/${deleteById}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': localStorage.getItem('token')
      }
    }).then(res => res.json())
      .then(res => setResDelete(resDelete + 1))
      .catch(err => setResDelete(false))
      .finally(() => resetRes())
  }, [changeDelete])

  return (
    <div className="to-do">
      <h2>Teendők</h2>

      <h3>Ruha</h3>
      {
        toDos && toDos.map(toDo =>
          toDo.type === 'clothes'
          && <ToDoItem key={uuidv4()} toDo={toDo} updateRecord={updateRecord} setDone={setDone} deleteRecord={deleteRecord} />)
      }

      <h3>Díszlet</h3>
      {
        toDos && toDos.map(toDo =>
          toDo.type === 'design'
          && <ToDoItem key={uuidv4()} toDo={toDo} updateRecord={updateRecord} setDone={setDone} deleteRecord={deleteRecord} />)
      }

      <h3>Étel</h3>
      {
        toDos && toDos.map(toDo =>
          toDo.type === 'food'
          && <ToDoItem key={uuidv4()} toDo={toDo} updateRecord={updateRecord} setDone={setDone} deleteRecord={deleteRecord} />)
      }

      <h3>Egyéb</h3>
      {
        toDos && toDos.map(toDo =>
          !(toDo.type === 'clothes' || toDo.type === 'design' || toDo.type === 'food')
          && <ToDoItem key={uuidv4()} toDo={toDo} updateRecord={updateRecord} setDone={setDone} deleteRecord={deleteRecord} />)
      }
    </div >
  )
}

export default ToDos