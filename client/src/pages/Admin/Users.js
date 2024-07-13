import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'

const Users = () => {
  return (
    <Layout title={"Admin-users"}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu></AdminMenu>
          </div>
          <div className="col-md-9 mt-4">
            <div className="card w-75 p-3">
              <h1>Users</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Users
