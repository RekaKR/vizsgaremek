import { useState, useEffect } from "react"

const useFetchGet = (ifStatement, url, reCall) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    if (ifStatement) {
      fetch(url, {
        headers: {
          'Authorization': localStorage.getItem('token')
        }
      })
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => setData(null))
    }
  }, [...reCall, url])

  return { data }
}

export default useFetchGet