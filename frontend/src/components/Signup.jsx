import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

function SignUp() {
    const [show, setShow] = useState(false)

    // Rendering without wrapper container: 
    // https://stackoverflow.com/questions/33766085/how-to-avoid-extra-wrapping-div-in-react
    return (
        <>
            <Button onClick={() => setShow(true)}> Sign up </Button>

            <Modal show={show} onHide={() => setShow(false)} >
                <Modal.Header closeButton>
                    <Modal.Title>Time to get cooking!</Modal.Title>
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
                    <Button type='submit'>Create an account!</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
        
}

export default SignUp