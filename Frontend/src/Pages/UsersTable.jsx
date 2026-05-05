import React, { useEffect, useState } from 'react'

function UsersTable() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8000/users')
                if (!response.ok) {
                    throw new Error('Failed to fetch users')
                }
                const data = await response.json()
                setUsers(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchUsers()
    }, [])

    if (loading) {
        return (
            <div className='bg h-full w-full p-5'>
                <div className='mt-5 text-center'>
                    <p className='text-blue-950 text-xl'>Loading users...</p>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className='bg h-full w-full p-5'>
                <div className='mt-5 text-center'>
                    <p className='text-red-500 text-xl'>Error: {error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className='bg h-full w-full p-5'>
            <div className='mt-5 p-5  h-[90vh] overflow-y-auto'>
                <h1 className='text-blue-950 text-3xl font-bold mb-5'>Users Table</h1>

                {users.length === 0 ? (
                    <div className='text-center'>
                        <p className='text-blue-950 text-xl'>No users found</p>
                    </div>
                ) : (
                    <div className='overflow-x-auto'>
                        <table className='min-w-full bg-white shadow-md rounded-lg overflow-hidden'>
                            <thead className='bg-blue-950 text-white'>
                                <tr>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>ID</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Email</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Program</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Created At</th>
                                    <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Updated At</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y divide-gray-200 '>
                                {users.map((user, index) => (
                                    <tr key={user.id || index} className='hover:bg-gray-50'>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900 '>{user.id}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{user.email}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>{user.program}</td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                            {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-900'>
                                            {user.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'N/A'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default UsersTable