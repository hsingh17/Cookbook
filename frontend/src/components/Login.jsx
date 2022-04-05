import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function Login() {
    const [show, setShow] = useState(false)

    return (
        <>
            <Button variant='outline-light' className='me-3' onClick={() => setShow(true)}> Log in </Button>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Get back to cooking!</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' placeholder='Please enter your email' />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' placeholder='Password' />
                        </Form.Group>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button type='submit'> Log in </Button>
                </Modal.Footer>

            </Modal>
        </>    
    )
}

export default Login