import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import ErrorAlert from './ErrorAlert'


function MyForm(props) {
    const [show, setShow] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [msg, setMsg] = useState('')
    const [variant, setVariant] = useState('')
    const [validated, setValidated] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const nav_btn_txt = props.nav_btn_txt
    const modal_btn_txt = props.modal_btn_txt
    const title = props.title
    const sign_up = props.flag
    const handle_login = props.handle_login

    // Native HTML5 form validation: 
    // https://react-bootstrap.netlify.app/forms/validation/#native-html5-form-validation
    const handle_submit = async e => {
        // Need a custom form handler since we want to capture the response from the server
        const form = e.currentTarget
        const form_data = new FormData(form)    // https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
        e.preventDefault()  // We want to submit via fetch not the normal form submit

        // Not a valid form
        const form_ok = form.checkValidity()
        setValidated(true)  // By setting to true, we apply feedback styles
        setLoading(true)    // Disable form button

        if (!form_ok) {    // Not a valid form
            e.stopPropagation()
            return
        } 

        const form_obj = Object.fromEntries(form_data.entries())
        try {
            // Needed for GET request since we want it to be a query param 
            const search_params = sign_up ? '' : ('?' + new URLSearchParams(form_obj))
            const URL = (
                            (process.env.NODE_ENV === 'development') ? 
                            process.env.REACT_APP_DEV_URL : 
                            process.env.REACT_APP_PROD_URL
                        ) + '/db/users' + search_params

            // https://developer.mozilla.org/en-US/docs/Web/API/fetch
            const response = await fetch(URL, {
                method      :   sign_up ? 'POST' : 'GET',
                body        :   sign_up ? JSON.stringify(form_obj) : null,
                credentials : 'include',    // Need 'include' to use cookies set from the response
                headers     : {
                    'Content-Type' : 'application/json' // Set approriate Content-Type
                }
            })
            
            const status = response.ok
            if (!status) {  // Unsuccessful signup/login
                setShowAlert(true)
                setLoading(false)
                setMsg(sign_up ? 'Please try a different username!' : 'Username or password was incorrect')
                setVariant('danger')
            } else if (status && sign_up) { // Successful sign up
                setShowAlert(true)
                setLoading(false)
                setMsg('User successfully created! You can now login via the login button.')
                setVariant('success')
            } else if (status && !sign_up) { // Successful login
                setShow(false)
                handle_login(document.cookie !== '') // Update state of nav to be logged in
                navigate('/favorites')  // Redirect to favorites
            }
        } catch (err) {
            console.error(err)
        }

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

                <Form 
                    noValidate
                    validated={validated} 
                    onSubmit={handle_submit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Username</Form.Label>
                            <InputGroup hasValidation>
                                <Form.Control 
                                    type='text' 
                                    placeholder='Please enter your username' 
                                    name='user' required />

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
                        <Button type='submit' disabled={loading}>{modal_btn_txt}</Button>
                    </Modal.Body>

                    <Modal.Footer className='justify-content-center'>
                        <ErrorAlert 
                            show={showAlert} 
                            msg={msg} 
                            variant={variant}/>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
        
}

export default MyForm