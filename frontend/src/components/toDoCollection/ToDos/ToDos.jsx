import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const ToDos = ({ toDos }) => {
  const [done, setDone] = useState(false)
  const [updateById, setUpdateById] = useState(false)
  const [deleteById, setDeleteById] = useState(false)
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [resUpdate, setResDelete] = useState(false)
  const [resDelete, setResUpdate] = useState(false)

  const clothesList = toDos && toDos.filter(toDo => toDo.type === 'clothes')
  const designList = toDos && toDos.filter(toDo => toDo.type === 'design')
  const foodList = toDos && toDos.filter(toDo => toDo.type === 'food')
  const otherList = toDos && toDos.filter(toDo => !(toDo.type === 'clothes' || toDo.type === 'design' || toDo.type === 'food'))


  const updateRecord = (toDo) => {
    //console.log(postId)
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
    //console.log(postId)
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

  console.log(deleteById)


  //console.log(done)

  return (
    <div className="to-do">
      <h2>Teendők</h2>

      <h3>Ruha</h3>
      {
        toDos && clothesList.map(cloth =>
          <div key={uuidv4()}>
            <span>{cloth.task}</span>
            <input type="checkbox" checked={checkboxValue} onClick={() => updateRecord(cloth)} onChange={() => setDone(!done)} />
            <button onClick={() => deleteRecord(cloth)}>xxx</button>
          </div>
        )
      }

      <h3>Díszlet</h3>
      {
        toDos && designList.map(design =>
          <div key={uuidv4()}>
            <span>{design.task}</span>
            <input type="checkbox" checked={checkboxValue} onClick={() => updateRecord(design)} onChange={() => setDone(!done)} />
            <button>x</button>
          </div>
        )
      }

      <h3>Étel</h3>
      {
        toDos && foodList.map(food =>
          <div key={uuidv4()}>
            <span>{food.task}</span>
            <input type="checkbox" checked={checkboxValue} onClick={() => updateRecord(food)} onChange={() => setDone(!done)} />
            <button>x</button>
          </div>
        )
      }

      <h3>Egyéb</h3>
      {
        toDos && otherList.map(other =>
          <div key={uuidv4()}>
            <span>{other.task}</span>
            <input type="checkbox" checked={checkboxValue} onClick={() => updateRecord(other)} onChange={() => setDone(!done)} />
            <button>x</button>
          </div>
        )
      }
    </div >
  )
}

export default ToDos