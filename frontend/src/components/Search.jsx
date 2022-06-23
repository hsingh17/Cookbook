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
        if (f in CACHE) { return CACHE[f] } // Data already in the CACHE
        
        const filter = (f === 'f') ? '' : f // Treat favorites filter as an ABC filter just to get data

        const URL = (process.env.NODE_ENV === 'development') ? 
                    process.env.REACT_APP_DEV_URL : 
                    process.env.REACT_APP_PROD_URL
                    
        const response = await fetch(`${URL}/api/filter?f=${filter}`)
        const data = await response.json()
        
        // Add on each meals favorite count to data object
        for (let category in data) {
            let arr =  data[category].meals
            if (arr === null) { continue }
            
            await Promise.all(Array.from(arr).map(async meal => {
                const fav_response = await fetch(`${URL}/db/meals?meal_id=${meal.idMeal}`)
                const fav_obj = await fav_response.json()
                meal['favCnt'] = fav_obj.fav_cnt
                return meal
            })) 
        }

        if (f === 'f') {    // Sorting by favorites so need a little more work
            let meals = []
            for (let category in data) {
                let arr = data[category].meals
                if (arr === null) { continue }
                meals.push(...arr)
            }
            meals.sort((meal1, meal2) => {
                return meal1.favCnt < meal2.favCnt
            })

            let fav_data = {
                'Sorted by Favorites' : { meals : meals } 
            }
            
            CACHE[f] = fav_data
            return fav_data

        }

        CACHE[f] = data 
        return data
    } catch (e) {
        console.error(e)
    }
}

function Search() {
    const [filter, setFilter] = useState('') // '': ABC, 'c': Category, 'a': Area, 'f': Favorites
    const [data, setData] = useState([])
    const [search_term, setSearchTerm] = useState('')
    const [ready, setReady] = useState(false)
    const input = useRef(null)

    useEffect(_ => {
        async function wrapper() {
            setData(await fetch_meals(filter))
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
                                <DropdownItem onClick={() => {new_filter('f')}}>Favorites</DropdownItem>
                            </DropdownButton>
                        </InputGroup>

                        {
                            data !== undefined ? 
                            <MealList key={data.length} data={data} search_term={search_term} /> : 
                            <></>
                        }
                    </Container>
                : 
                    <CustomSpinner msg={'Sit tight. We\'re getting you those meals 🔎'}/>
            }
        </Container>
    )
}

export default Search