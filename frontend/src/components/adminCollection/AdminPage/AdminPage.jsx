import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import useFetchGet from "../../../customHooks/useFetchGet"
import '../../../style/css/admin.css'

const AdminPage = () => {
  const menuSpec = []
  const [people, setPeople] = useState(null)
  const [show, setShow] = useState(false)
  const [isComing, setIsComing] = useState('')
  const [isComingPlus, setIsComingPlus] = useState('')
  const [no, setNo] = useState('')
  const [vega, setVega] = useState('')
  const [vegan, setVegan] = useState('')
  const [lakto, setLakto] = useState('')
  const [glu, setGlu] = useState('')
  const [sugar, setSugar] = useState('')
  const [paleo, setPaleo] = useState('')

  const { data } = useFetchGet(true, 'http://localhost:3001/api/user/all', [''])

  useEffect(() => {
    setPeople(data)
  }, [data])

  useEffect(() => {
    if (people) {
      setIsComing(people.map(person => person.name))
      setIsComingPlus(people.map(person => person.plusOneName))

      people.map(person => {
        person.foodS.map(foodS => menuSpec.push(foodS))
        person.plusOneFoodS.map(foodS => menuSpec.push(foodS))
      })

      setNo(menuSpec.filter(num => num === 'nincs').length)
      setVega(menuSpec.filter(num => num === 'vega').length)
      setVegan(menuSpec.filter(num => num === 'vegán').length)
      setLakto(menuSpec.filter(num => num === 'laktóz mentes').length)
      setGlu(menuSpec.filter(num => num === 'glutén mentes').length)
      setSugar(menuSpec.filter(num => num === 'cukor mentes').length)
      setPaleo(menuSpec.filter(num => num === 'paleo').length)
    }
  }, [people])

  return (
    <div className="admin-page">
      <h2>Admin felület</h2>

      {
        people
          ? <>
            <div>
              <h3>Vendég lista</h3>
              {isComing && isComing.map(person => <p key={uuidv4()}>{person}</p>)}
              {isComingPlus && isComingPlus.map(person => <p key={uuidv4()}>{person}</p>)}
            </div>

            <br /> {/*törölni később*/}

            <div>
              <h3>Menü választékok</h3>
              <p>Nincs: {no}</p>
              <p>Vega: {vega}</p>
              <p>Vegán: {vegan}</p>
              <p>Laktóz mentes: {lakto}</p>
              <p>Glutén mentes: {glu}</p>
              <p>Cukor mentes: {sugar}</p>
              <p>Paleo: {paleo}</p>
            </div>

            <br /> {/*törölni később*/}

            <button onClick={() => setShow(!show)}>Mutasd részletesen</button>

          </>
          : "Loading..."
      }

      {
        show &&
        people.map(person =>
          <div key={uuidv4()}>

            <br /> {/*törölni később*/}

            <h3>Vendég</h3>
            <p>{person.name} | {person.email}</p>

            <p>Speciális menü igénye:
              {person.foodS.length > 0
                ? person.foodS.map(foodS =>
                  <span key={uuidv4()}> {foodS}</span>)
                : <span> nincs</span>
              }
            </p>

            <p>Kísérővel érkezik:
              {person.plusOneComing
                ? <span> igen</span>
                : <span> nem</span>
              }
            </p>

            {person.plusOneComing &&
              <p>Kísérő speciális menü igénye:
                {person.plusOneFoodS
                  ? person.plusOneFoodS.map(foodS =>
                    <span key={uuidv4()}> {foodS}</span>)
                  : <span> nincs</span>
                }
              </p>
            }

            <br /> {/*törölni később*/}

          </div>
        )
      }

    </div >
  )
}

export default AdminPage
