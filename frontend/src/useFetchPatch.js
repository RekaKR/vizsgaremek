import { useState, useEffect } from "react"

const useFetchPatch = (ifStatement, url, body, reCall) => {
  const [data, setData] = useState(null)

  const resetRes = () => {
    if (data === 10) setData(0)
  }

  useEffect(() => {
    if (ifStatement) {
      fetch(url, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify({ ...body })
      }).then(res => res.json())
        .then(res => setData(data + 1))
        .catch(err => setData(null))
        .finally(() => resetRes())
    }
  }, [...reCall, url])

  return { data }
}

export default useFetchPatch