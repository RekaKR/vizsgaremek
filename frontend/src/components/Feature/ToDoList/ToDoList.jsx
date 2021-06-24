import React from 'react'
//Listák, mik vannak kész

const ToDoList = () => {
  return (
    <div className="to-do-list">
      <h2>Elintézni valók</h2>
      <input type="checkbox" />

      <h3>Ruha</h3>
      <p>Öltöny</p>
      <p>Menasszonyi ruha</p>
      <p>Csokor</p>
      <p>Gyűrű</p>

      <h3>Díszlet</h3>
      <p>Díszítés</p>
      <p>Virágok</p>
      <p>Teríték</p>
      <p>stb</p>

      <h3>Étel</h3>
      <p>Előétel</p>
      <p>Főétel</p>
      <p>Desszert</p>
      <p>Torta</p>
      <p>Hajnali kaja</p>
      <p>Másnapi brunch</p>
    </div>
  )
}

export default ToDoList
