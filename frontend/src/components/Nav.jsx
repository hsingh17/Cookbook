import React, { useState } from 'react'
import Random from './Random.jsx'
import Search from './Search.jsx'
import Favorites from './Favorites.jsx'
import Meals from './Meals.jsx'
import Error from './Error.jsx'
import SignUp from './Signup.jsx'
import Login from './Login.jsx'
import Logout from './Logout.jsx'
import { 
        Route, 
        BrowserRouter as Router, 
        Routes
} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import '../styles/Nav.css'

function MyNav() {
    const [loggedIn, setLoggedIn] = useState(document.cookie !== '')

    const login_wrapper = login => {
        setLoggedIn(login)
    }

    return (
        <Router>
            <Navbar id='my-nav' sticky='top' expand='lg'>
                <Container>
                    <Navbar.Toggle aria-controls='navbar'/>
                    <Navbar.Collapse id='navbar'>
                        <Navbar.Brand href=''>Cookbook</Navbar.Brand>
                        <Nav>
                            <Nav.Link href='/search'>
                                <span> Search </span>
                            </Nav.Link>
                            
                            <Nav.Link href='/random'>
                                <span> Random </span>
                            </Nav.Link>
                            
                            <Nav.Link href='/favorites'>
                                <span> Favorites </span>
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    
                    <Container className='ms-auto me-0 w-auto'>
                        {
                            !loggedIn ?
                            <>
                                <Login handle_login={login_wrapper} />
                                <SignUp />
                            </> :
                            <Logout handle_login={login_wrapper} />
                        }
                    </Container>
                </Container>
            </Navbar>

            <Routes>
                <Route path ='/search' element={<Search/>} />
                <Route path ='/random' element={<Random/>} />
                <Route path ='/favorites' element={<Favorites logged_in={loggedIn} />} />
                <Route path ='/meals/:id' element={<Meals/>} />
                <Route path ='*' element={<Error/>} />
            </Routes>
        </Router>
    )
}

export default MyNav