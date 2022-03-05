import React, { useEffect, useState } from 'react'
import axios from 'axios'
import MealCard from './MealCard.jsx'
import '../styles/Random.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
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
        <Container > 
            <Container id='spinner-wrapper' className={`d-flex flex-column justify-content-center align-items-center d-${spinner_visible}`}>
                <Row>
                    <Spinner animation='border' role="status">
                        <span className='visually-hidden'>Loading...</span>
                    </Spinner>
                </Row>

                <Row className='mt-2'>
                    Cooking up something tasty 😋 ...
                </Row>
            </Container>
            
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