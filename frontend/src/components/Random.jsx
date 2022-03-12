import React, { useEffect, useState } from 'react'
import Recipe from './Recipe.jsx'
import CustomSpinner from './CustomSpinner.jsx'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

function Random() {
    const [data, setData] = useState({})
    const [id, setId] = useState('')
    const [ready, setReady] = useState(false)
    const fetch_meal = async _ => {
        const response = await fetch('http://localhost:5000/api/random')
        const data = await response.json()
        setData(data)
        setId(data.meals[0].idMeal)
        setReady(true)
    }

    useEffect(_ => {
        async function wrapper() {
            fetch_meal()
        }

        wrapper()
    }, [])  //  https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once

    return (
        <Container>
            {ready ?
                    <Container className='d-flex flex-column align-items-center'>
                        <Recipe key={id} data={data}/>
                        <Button variant='dark' onClick={ async _ => {
                            setData({})
                            setId('')
                            setReady(false)
                            fetch_meal()
                        }} className='mb-4'>
                            Cook me up something else 🍳!
                        </Button>
                    </Container>
                :
                    <CustomSpinner msg={'Cooking up something tasty 😋'}/>
            }

        </Container>
    )
}

export default Random