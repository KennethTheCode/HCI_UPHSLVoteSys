import React, { useState } from 'react'
import Logo from '../Images/logo.png'
import { useNavigate } from 'react-router-dom'

function Navbar3() {
  const navigate = useNavigate()

  // ✅ state for logout popup
  const [showLogoutPopup, setShowLogoutPopup] = useState(false)

  const handleLogout = () => {
    // clear stored user data
    localStorage.removeItem('userEmail')

    // redirect to login
    navigate('/login')
  }

  return (
    <>
      <div className='flex items-center justify-center bg-gradient-to-r from-blue-950 via-blue-900 to-blue-900 w-full h-[5vh] pl-[13%] pr-[15%] border-b-10 border-yellow-400'>
        <div className='h-[8vh] w-[50vh] flex items-center justify-center gap-7 text-white font-bold text-[15px] rounded'>
          
        

          <div className='w-[12vh] flex items-center justify-end gap-1'>
            <span className="material-symbols-outlined">
              person
            </span>

            <p
              className='hover:text-gray-200 transition-colors duration-300 cursor-pointer'
              onClick={() => setShowLogoutPopup(true)}
>
              Log Out
            </p>
          </div>
        </div>
      </div>

      {showLogoutPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[320px] text-center">
            
            <h2 className="text-lg font-bold text-red-600 mb-3">
              Confirm Logout
            </h2>

            <p className="text-gray-700 mb-5">
              Are you sure you want to log out?
            </p>

            <div className="flex justify-center gap-4">
              
              {/* Cancel */}
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition"
                onClick={() => setShowLogoutPopup(false)}
              >
                Cancel
              </button>

              {/* Confirm */}
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                onClick={handleLogout}
              >
                Yes, Logout
              </button>

            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar3