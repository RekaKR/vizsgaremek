import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import useFetchGet from "../../../customHooks/useFetchGet"

const AdminPage = () => {
  const [allInfo, setAllInfo] = useState(null)

  const { data } = useFetchGet(true, 'http://localhost:3001/api/user/all', [''])

  useEffect(() => {
    setAllInfo(data)
  }, [data])


  return (
    <div>
      <h2>Admin felület</h2>

      {
        allInfo &&
        allInfo.map(info =>
          <div key={uuidv4()}>
            <p>{info.name}</p>
            <p>{info.email}</p>
          </div>
        )
      }

    </div>
  )
}

export default AdminPage
