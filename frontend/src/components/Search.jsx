import React, { useEffect, useRef, useState } from 'react'
import MealList from './MealList.jsx'
import Container from 'react-bootstrap/Container'
import DropdownButton from 'react-bootstrap/DropdownButton'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import CustomSpinner from './CustomSpinner.jsx'

async function fetch_meals() {
    // Pre-fetch abc, category, and area data in parallel
    // https://stackoverflow.com/questions/35612428/call-async-await-functions-in-parallel
    let filter_data = ['', 'c', 'a']
    await Promise.all(filter_data.map(async (f, i)  => {
        const response = await fetch(`http://localhost:5000/api/filter?f=${f}`)
        const data = await response.json()
        filter_data[i] = data
    }))

    return filter_data
}

function Search() {
    const [filter, setFilter] = useState(0) // 0: ABC, 1: Category, 2: Area
    const [data, setData] = useState([])
    const [search_term, setSearchTerm] = useState('')
    const [ready, setReady] = useState(false)
    const input = useRef(null)

    useEffect(_ => {
        async function wrapper() {
            setData(await fetch_meals())
            setReady(true)
        }

        wrapper()
    }, [])
    
    const new_filter = f => {
        setFilter(f)
    }
    
    const handle_input = _ => {
        setSearchTerm(input.current.value)
    }

    const spinner_visible = !(ready) ? 'block' : 'none'
    return (
        <Container>
            <CustomSpinner visible={spinner_visible} msg={'Sit tight. We\'re getting you those meals 🔎'}/>

            <InputGroup size='md' className='pt-4'>
                <FormControl placeholder='Search meals...' onKeyUp={handle_input} ref={input} />
                <DropdownButton title='Filter by:'>
                    <DropdownItem onClick={() => {new_filter(0)}}>Alphabetical</DropdownItem>
                    <DropdownItem onClick={() => {new_filter(1)}}>Area</DropdownItem>
                    <DropdownItem onClick={() => {new_filter(2)}}>Category</DropdownItem>
                </DropdownButton>
            </InputGroup>

            <MealList key={filter + data.length} data={data[filter]} search_term={search_term} />
        </Container>
    )
}

export default Search