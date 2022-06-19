import React from 'react'
import Random from './Random.jsx'
import Search from './Search.jsx'
import Favorites from './Favorites.jsx'
import Meals from './Meals.jsx'
import Error from './Error.jsx'
import SignUp from './Signup.jsx'
import { 
        Route, 
        BrowserRouter as Router, 
        Routes
} from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import '../styles/Nav.css'
import Login from './Login.jsx'

function MyNav() {
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
                            document.cookie === '' ?
                            <>
                                <Login />
                                <SignUp />
                            </> :
                            <span>Logged in</span>
                        }
                    </Container>
                </Container>
            </Navbar>

            <Routes>
                <Route path ='/search' element={<Search/>}/>
                <Route path ='/random' element={<Random/>}/>
                <Route path ='/favorites' element={<Favorites/>}/>
                <Route path ='/meals/:id' element={<Meals/>}/>
                <Route path ='*' element={<Error/>}/>
            </Routes>
        </Router>
    )
}

export default MyNav