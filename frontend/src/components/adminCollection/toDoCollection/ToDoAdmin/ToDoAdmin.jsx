import React, { useState, useEffect } from 'react'
import ToDos from '../ToDos/ToDos'
import ToDoInput from '../ToDoInput/ToDoInput'

const ToDoAdmin = () => {
  const [toDos, setToDos] = useState('')
  const [changeUpdate, setChangeUpdate] = useState(false)
  const [changeDelete, setChangeDelete] = useState(false)

  const [done, setDone] = useState(false)
  const [updateById, setUpdateById] = useState(false)
  const [deleteById, setDeleteById] = useState('')
  const [checkboxValue, setCheckboxValue] = useState(false)

  const [resUpdate, setResUpdate] = useState(0)
  const [resDelete, setResDelete] = useState(0)
  const [resPost, setResPost] = useState('')

  const resetRes = () => {
    if (resUpdate >= 10) setResUpdate(0)
    if (resDelete >= 10) setResDelete(0)
  }

  useEffect(() => {
    fetch('http://localhost:3001/to-do-list')
      .then(res => res.json())
      .then(data => setToDos(data))
      .catch(err => setToDos(null))
  }, [resUpdate, resDelete, resPost])

  const updateRecord = (toDo) => {
    setCheckboxValue(prevCheckboxValue => !prevCheckboxValue)
    setUpdateById(toDos.filter(item => item.key === toDo.key) && toDo._id)
    setChangeUpdate(!changeUpdate)
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
      .then(res => setResUpdate(resUpdate + 1))
      .catch(err => setResUpdate(false))
      .finally(() => resetRes())
  }, [changeUpdate])


  const deleteRecord = (toDo) => {
    //console.log(deleteById)
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


  console.log('resUpdate: ', resUpdate)
  console.log('resDelete: ', resDelete)

  return (
    <div className="admin-to-dos">
      <ToDos toDos={toDos} updateRecord={updateRecord} setDone={setDone} deleteRecord={deleteRecord} />

      <ToDoInput resPost={resPost} setResPost={setResPost} />
    </div>
  )
}

export default ToDoAdmin