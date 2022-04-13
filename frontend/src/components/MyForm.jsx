import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

function MyForm(props) {
    const [show, setShow] = useState(false)
    const [validated, setValidated] = useState(false)
    const nav_btn_txt = props.nav_btn_txt
    const modal_btn_txt = props.modal_btn_txt
    const title = props.title
    const sign_up = props.flag
    
    // Native HTML5 form validation: 
    // https://react-bootstrap.netlify.app/forms/validation/#native-html5-form-validation
    const handle_submit = e => {
        const form = e.currentTarget
        if (!form.checkValidity()) {
            e.preventDefault()
            e.stopPropagation()
        } 
    
        setValidated(true)  // By setting to true, we apply feedback styles
    }

    // Rendering without wrapper container: 
    // https://stackoverflow.com/questions/33766085/how-to-avoid-extra-wrapping-div-in-react
    return (
        <>
            <Button 
                onClick={() => setShow(true)} 
                className={!sign_up ? 'me-3' : ''}
                variant={!sign_up ? 'outline-light' : 'primary'}>
                {nav_btn_txt}
            </Button>

            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>{title}</Modal.Title>
                </Modal.Header>

                <Form action='http://localhost:5000/db/users' method={sign_up ? 'POST' : 'GET'} noValidate validated={validated} onSubmit={handle_submit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control type='text' placeholder='Please enter your username' name='user' required />

                                <Form.Control.Feedback type='invalid'>
                                    Please type a username!
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control type='password' placeholder='Password' name='pass' required />

                                <Form.Control.Feedback type='invalid'>
                                    Please type a password!
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                        <Button type='submit'>{modal_btn_txt}</Button>
                    </Modal.Body>

                    <Modal.Footer>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
        
}

export default MyForm