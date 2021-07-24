import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import ToDoItem from '../ToDoItem.jsx/ToDoItem'

const ToDos = ({ toDos, updateRecord, setDone, deleteRecord }) => {
  //const clothesList = toDos && toDos.filter(toDo => toDo.type === 'clothes')
  //const designList = toDos && toDos.filter(toDo => toDo.type === 'design')
  //const foodList = toDos && toDos.filter(toDo => toDo.type === 'food')
  //const otherList = toDos && toDos.filter(toDo => !(toDo.type === 'clothes' || toDo.type === 'design' || toDo.type === 'food'))

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