import React, { useState, useEffect } from 'react'

const ToDoList = ({ toDos, toDo }) => {
  const [done, setDone] = useState(false)
  const [updateById, setUpdateById] = useState(false)
  const [deleteById, setDeleteById] = useState(false)
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [resUpdate, setResDelete] = useState(false)
  const [resDelete, setResUpdate] = useState(false)

  const updateRecord = (toDo) => {
    setCheckboxValue(prevCheckboxValue => !prevCheckboxValue)
    setUpdateById(toDos.filter(item => item.key === toDo.key) && toDo._id)
  }

  useEffect(() => {
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
      .then(res => setResUpdate(true))
      .catch(err => setResUpdate(false))
  }, [updateById])


  const deleteRecord = (toDo) => {
    setDeleteById(toDos.filter(item => item.key === toDo.key) && toDo._id)
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
      .then(res => setResDelete(true))
      .catch(err => setResDelete(false))
  }, [deleteById])

  return (
    <div>
      <span>{toDo.task}</span>
      <input type="checkbox" checked={checkboxValue} onClick={() => updateRecord(toDo)} onChange={() => setDone(!done)} />
      <button onClick={() => deleteRecord(toDo)}>xxx</button>
    </div>
  )
}

export default ToDoList


{/*
        toDos && clothesList.map(toDo =>
          <ToDoList key={uuidv4()} toDos={toDos} toDo={toDo} />)
      */}