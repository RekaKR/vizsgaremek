import { useState, useEffect } from "react"

const useFetchPatch = (url, body, reCall) => {
  const [data, setData] = useState(null)

  useEffect(() => {
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({ ...body })
    }).then(res => res.json())
      .then(res => setData(data + 1))
      .catch(err => setData(null))
  }, [...reCall, url])

  return { data }
}

export default useFetchPatch