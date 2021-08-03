import { useState, useEffect } from "react"

const useFetchDelete = (ifStatement, url, reCall) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    if (ifStatement) {
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      }).then(res => res.json())
        .then(res => setData(data + 1))
        .catch(err => setData(false))
      //.finally(() => resetRes())
    }
  }, [...reCall, url])

  return { data }
}

export default useFetchDelete