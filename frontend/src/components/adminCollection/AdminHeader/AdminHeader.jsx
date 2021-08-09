import React from 'react'
import { Link } from 'react-router-dom'

const AdminHeader = ({ url }) => {

  return (
    <div className="admin-header header">
      <Link to={url}>
        Admin főoldal
      </Link>

      <Link to={`${url}/guest-list`}>
        Vendéglista
      </Link>

      <Link to={`${url}/timeline`}>
        Menetrend
      </Link>

      <Link to={`${url}/accommodations`}>
        Szállás
      </Link>

      <Link to={`${url}/to-do-list`}>
        Teendők
      </Link>

      <Link to={`${url}/seats`}>
        Ülésrend
      </Link>
    </div>
  )
}

export default AdminHeader