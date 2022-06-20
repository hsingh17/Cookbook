import React, { useState, useEffect } from 'react'
import Recipe from './Recipe.jsx'
import { useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

function Meals() {
    const params = useParams()
    const [ready, setReady] = useState(false)
    const [data, setData] = useState(null)

    useEffect(_ => {
        async function wrapper() {
            try {
                const URL = (process.env.NODE_ENV === 'development') ? 
                            process.env.REACT_APP_DEV_URL : 
                            process.env.REACT_APP_PROD_URL

                const response = await fetch(`${URL}/api/search?id=${params.id}&type=i`)
                const data = await response.json()
                setData(data)
                setReady(true)
            } catch (e) {
                console.error(e)
            }
        }

        wrapper()
    })

    return (
        <Container>
            {ready ? <Recipe key={params.id} data={data} /> : <></>}
        </Container>
    )
}

export default Meals