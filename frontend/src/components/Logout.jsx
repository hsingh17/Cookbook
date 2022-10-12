import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import { useNavigate } from 'react-router-dom'

function Logout(props) {
    const handle_login = props.handle_login
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const logout = async _ => {
        setLoading(true)
        const URL = (
            (process.env.NODE_ENV === 'development') ? 
            process.env.REACT_APP_DEV_URL : 
            process.env.REACT_APP_PROD_URL
        ) + '/db/users'
        
        const response = await fetch(URL, {
            method      :   'DELETE', 
            credentials :   'include'
        })

        const status = response.ok 
        if (status) {
            setLoading(false)
            handle_login(document.cookie.search("sessionID") !== -1)
            navigate('/')  // Redirect to home page
        }
    }

    return (
        <Button
            disabled={loading} 
            variant='secondary'
            onClick={logout}>
            {loading ? 'Logging out...' : 'Logout'}
        </Button>
    )
}

export default Logout