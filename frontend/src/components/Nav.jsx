import React from 'react'
import Random from './Random.jsx'
import Search from './Search.jsx'
import Favorites from './Favorites.jsx'
import Meals from './Meals.jsx'
import Error from './Error.jsx'
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
    return (
        <Router>
            <Navbar sticky='top' bg='light' variant='light' expand='lg'>
                <Container>
                    <Navbar.Brand href="">Cookbook</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
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