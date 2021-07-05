import React, { useState } from 'react'

function Api() {
  const [name, setName] = useState('')
  const [article, setArticle] = useState('')
  const [res, setRes] = useState(false)

  const submit = () => {
    fetch('http://localhost:3001/api', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        article: article
      })
    }).then(res => res.json())
      .then(res => {
        setRes(true)
        console.log(res)
      })
      .catch(err => setRes(false))
  }

  return (
    <div className="api">
      <div>
        <p>name</p>
        <input type="text" onChange={e => setName(e.target.value)} />
      </div>

      <div>
        <p>article</p>
        <input type="text" onChange={e => setArticle(e.target.value)} />
      </div>

      <button disabled={!(name && article)} onClick={() => submit()}>Submit</button>
    </div>
  );
}

export default Api;
