import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Spinner from 'react-bootstrap/Spinner'
import '../styles/CustomSpinner.css'

function CustomSpinner(props) {
    const msg = props.msg
    return (
        <Container id='spinner-wrapper' className='d-flex flex-column justify-content-center align-items-center'>
            <Row>
                <Spinner animation='border' role="status">
                    <span className='visually-hidden'>Loading...</span>
                </Spinner>
            </Row>

            <Row className='mt-2'> {msg} </Row>
        </Container>
    )
}

export default CustomSpinner