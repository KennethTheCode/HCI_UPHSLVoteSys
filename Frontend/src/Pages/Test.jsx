import React, { useEffect, useState } from 'react'

function Test() {
    const [message, setMessage] = useState('Loading...')

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('http://localhost:8000/')
                const data = await res.json()
                setMessage(data.message)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    return (
        <div>{message}</div>
    )
}

export default Test