import React from 'react'
import { Link } from 'react-router-dom'
//import '../../style/css/style.css'

const AdminHeader = ({ url }) => {

  return (
    <div className="admin-header header">
      <Link to={`${url}/guest-list`}>
        Vendég lista
      </Link>

      <Link to={`${url}/timeline`}>
        Menetrend
      </Link>

      <Link to={`${url}/accommodations`}>
        Szállás
      </Link>

      <Link to={`${url}/seats`}>
        Ülésrend
      </Link>
    </div>
  )
}

export default AdminHeader