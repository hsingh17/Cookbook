import React from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Video from '../media/home_page_video.mp4'
import '../styles/Home.css'

function Home() {
    const navigate = useNavigate()

    const handle_click = _ => {
        navigate('/search')
    }

    return (
        <Container id='video-background' fluid>
            <video autoPlay='true' loop='true' muted='true'>
                <source src={Video} type='video/mp4' />
            </video>
            <div id='opaque'>
                <h1>Hungry?</h1>
                <h3>Let's find your next meal.</h3>
                <Button 
                    className='mt-5' 
                    variant='light' 
                    size='lg'
                    onClick={handle_click}>
                    Browse meals
                </Button>
            </div>
        </Container>
    )
}

export default Home