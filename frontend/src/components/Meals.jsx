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
            const response = await fetch(`http://localhost:5000/api/search?id=${params.id}&type=i`)
            const data = await response.json()
            setData(data)
            setReady(true)
        }

        wrapper()
    }, [])

    return (
        <Container>
            {ready ? <Recipe key={params.id} data={data}/> : <></>}
        </Container>
    )
}

export default Meals