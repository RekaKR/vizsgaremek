import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

const ToDos = ({ toDos }) => {
  const [done, setDone] = useState(false)
  const [postId, setPostId] = useState(false)
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [resUpdate, setResUpdate] = useState(false)

  useEffect(() => {
    fetch(`http://localhost:3001/to-do-list/${postId}`, {
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
  }, [postId])

  const update = (toDo) => {
    //console.log(postId)
    setCheckboxValue(prevCheckboxValue => !prevCheckboxValue)
    setPostId(toDos.filter(item => item.key === toDo.key) && toDo._id)
  }

  //console.log(done)

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
            <input type="checkbox" checked={checkboxValue} onClick={() => update(toDo)} onChange={() => setDone(!done)} />
            <button>x</button>
          </div>
        )
      }

      <h3>Díszlet</h3>
      {
        toDos && toDos.map(toDo =>
          toDo.type === 'design' &&
          <div key={uuidv4()}>
            <p>{toDo.task}</p>
            <input type="checkbox" checked={checkboxValue} onClick={() => update(toDo)} onChange={() => setDone(!done)} />
            <button>x</button>
          </div>
        )
      }

      <h3>Étel</h3>
      {
        toDos && toDos.map(toDo =>
          toDo.type === 'food' &&
          <div key={uuidv4()}>
            <p>{toDo.task}</p>
            <input type="checkbox" checked={checkboxValue} onClick={() => update(toDo)} onChange={() => setDone(!done)} />
            <button>x</button>
          </div>
        )
      }

      <h3>Egyéb</h3>
      {
        toDos && toDos.map(toDo =>
          toDo.type !== 'clothes' && toDo.type !== 'design' && toDo.type !== 'food' &&
          <div key={uuidv4()}>
            <p>{toDo.task}</p>
            <input type="checkbox" checked={checkboxValue} onClick={() => update(toDo)} onChange={() => setDone(!done)} />
            <button>x</button>
          </div>
        )
      }
    </div >
  )
}

export default ToDos