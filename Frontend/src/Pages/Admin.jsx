import React from 'react'
import Navbar2 from '../Components/Navbar2'
import PageHeader from '../Components/PageHeader'
import PageHeader3 from '../Components/PageHeader3'
import ControlPanel from '../Components/ControlPanel'
import AdminBody from '../Components/AdminBody'
import Dashboard from '../Components/Dashboard'
import Test from './Test'
function Admin() {
  return (
    <div>
        <Navbar2 />
        <PageHeader3 Header="Admin Panel" />
        <ControlPanel />
        <AdminBody />
        <Dashboard />
    </div>
  )
}

export default Admin