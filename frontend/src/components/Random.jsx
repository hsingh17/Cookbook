import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MealCard from './MealCard.jsx'
import CustomSpinner from './CustomSpinner.jsx'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

function Random() {
    const [data, setData] = useState({})
    const [id, setId] = useState('')
    const [ready, setReady] = useState(false)
    const fetch_meal = async _ => {
        const response = await axios('http://localhost:5000/api/random')
        const data = await response.data
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

    const card_visible = (ready) ? 'flex' : 'none'
    const spinner_visible = !(ready) ? 'block' : 'none'
    return (
        <Container> 
            <CustomSpinner visible={spinner_visible} msg={'Cooking up something tasty 😋'}/>

            <Container className={`d-${card_visible} flex-column align-items-center`}>
                <MealCard key={id} data={data}/>
                <Button variant='dark' onClick={ async _ => {
                    setData({})
                    setId('')
                    setReady(false)
                    fetch_meal()
                }} className='mb-4'>
                    Cook me up something else 🍳!
                </Button>
            </Container>
        </Container>
    )
}

export default Random