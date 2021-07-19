import React from 'react'
import ToDoInput from '../ToDoInput/ToDoInput'

const ToDos = ({ toDos }) => {

  console.log(toDos)

  return (
    <div className="to-do">
      <h2>Elintézni valók</h2>
      <input type="checkbox" />

      <h3>Ruha</h3>

      <h3>Díszlet</h3>

      <h3>Étel</h3>

      <ToDoInput />
    </div>
  )
}

export default ToDos

/*
import { v4 as uuidv4 } from 'uuid'
      {accommodations && accommodations.map(accommodation => <Accommodation key={uuidv4()} accommodation={accommodation} />)}
*/