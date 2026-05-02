import React from 'react'
import Navbar2 from '../Components/Navbar2'
import RegForm from '../Components/RegForm'
import ControlPanel from '../Components/ControlPanel'
import UsersTable from '../Pages/UsersTable'

function Register() {
  return (
    <div>
        <Navbar2 />
        <div className='w-full h-[98vh] flex  items-center'>
            <RegForm />
            <UsersTable />
        </div>
    </div>
  )
}

export default Register