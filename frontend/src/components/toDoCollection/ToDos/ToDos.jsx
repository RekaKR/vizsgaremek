import React from 'react'
import { v4 as uuidv4 } from 'uuid'

const ToDos = ({ toDos }) => {

  return (
    <div className="to-do">
      <h2>Teendők</h2>


      {/*Először 4 db rövid listát csinálni a toDos-ból, és ezután a 4 listán megyek végig.*/}

      <h3>Ruha</h3>
      {
        toDos && toDos.map(toDo =>
          toDo.type === 'clothes' &&
          <div key={uuidv4()}>
            <p>{toDo.task}</p>
            <input type="checkbox" />
          </div>
        )
      }

      <h3>Díszlet</h3>
      {
        toDos && toDos.map(toDo =>
          toDo.type === 'design' &&
          <div key={uuidv4()}>
            <p>{toDo.task}</p>
            <input type="checkbox" />
          </div>
        )
      }

      <h3>Étel</h3>
      {
        toDos && toDos.map(toDo =>
          toDo.type === 'food' &&
          <div key={uuidv4()}>
            <p>{toDo.task}</p>
            <input type="checkbox" />
          </div>
        )
      }

      <h3>Egyéb</h3>
      {
        toDos && toDos.map(toDo =>
          toDo.type !== 'clothes' && toDo.type !== 'design' && toDo.type !== 'food' &&
          <div key={uuidv4()}>
            <p>{toDo.task}</p>
            <input type="checkbox" />
          </div>
        )
      }
    </div>
  )
}

export default ToDos