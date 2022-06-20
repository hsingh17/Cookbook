import React, { useEffect, useRef, useState } from 'react'
import MealList from './MealList.jsx'
import Container from 'react-bootstrap/Container'
import DropdownButton from 'react-bootstrap/DropdownButton'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import CustomSpinner from './CustomSpinner.jsx'

let CACHE = {}
async function fetch_meals(f) {
    try {
        const URL = (process.env.NODE_ENV === 'development') ? 
                    process.env.REACT_APP_DEV_URL : 
                    process.env.REACT_APP_PROD_URL
                    
        const response = await fetch(`${URL}/api/filter?f=${f}`)
        const data = await response.json()
        if (!(f in CACHE)) { CACHE[f] = data }
        return data
    } catch (e) {
        console.error(e)
    }
}

function Search() {
    const [filter, setFilter] = useState('') // 0: ABC, 1: Category, 2: Area
    const [data, setData] = useState([])
    const [search_term, setSearchTerm] = useState('')
    const [ready, setReady] = useState(false)
    const input = useRef(null)

    useEffect(_ => {
        async function wrapper() {
            if ((filter in CACHE)) {
                setData(CACHE[filter])
            } else {
                setData(await fetch_meals(filter))
            }
            setReady(true)
        }

        wrapper()
    }, [filter])
    
    const new_filter = f => {
        if (f === filter) { return }    // Filter didn't change
        setSearchTerm('')
        setReady(false)
        setFilter(f)
    }
    
    const handle_input = _ => { setSearchTerm(input.current.value) }

    return (
        <Container>
            {ready ?
                    <Container>
                        <InputGroup size='md' className='pt-4'>
                            <FormControl placeholder='Search meals...' onKeyUp={handle_input} ref={input} />
                            <DropdownButton title='Filter by:'>
                                <DropdownItem onClick={() => {new_filter('')}}>Alphabetical</DropdownItem>
                                <DropdownItem onClick={() => {new_filter('c')}}>Category</DropdownItem>
                                <DropdownItem onClick={() => {new_filter('a')}}>Area</DropdownItem>
                            </DropdownButton>
                        </InputGroup>

                        <MealList key={data.length} data={data} search_term={search_term} />
                    </Container>
                : 
                    <CustomSpinner msg={'Sit tight. We\'re getting you those meals 🔎'}/>
            }
        </Container>
    )
}

export default Search