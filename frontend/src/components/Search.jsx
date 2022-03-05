import React, { useEffect, useState } from 'react'
import MealList from './MealList.jsx'
import Container from 'react-bootstrap/Container'
import DropdownButton from 'react-bootstrap/DropdownButton'
import DropdownItem from 'react-bootstrap/esm/DropdownItem'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
// import Spinner from 'react-bootstrap/Spinner'
import '../styles/Search.css'

// export default class Search extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             filter  : 0, // 0: ABC, 1: Category, 2: Area
//             data    : [],
//         }
//     }
    
//     async fetch_meals() {
//         // Pre-fetch abc, category, and area data in parallel
//         // https://stackoverflow.com/questions/35612428/call-async-await-functions-in-parallel
//         let filter_data = ['', 'c', 'a']
//         await Promise.all(filter_data.map(async (f, i)  => {
//             const response = await fetch(`http://localhost:5000/api/filter?f=${f}`)
//             const data = await response.json()
//             filter_data[i] = data
//         }))

//         return filter_data
//     }

//     async componentDidMount() {
//         this.setState({
//             filter  : 0,
//             data    : await this.fetch_meals(),
//         })
//     }

//     async new_meal_list(f) {
//         this.setState({
//             filter  : f,
//             data    : this.state.data
//         })
//     }
    
//     render() {
//         return (
//             <Container>
//                 <InputGroup size='md' className='pt-4'>
//                     <FormControl placeholder='Search meals...' onChange={console.log()}/>
//                     <DropdownButton title='Filter by:'>
//                         <DropdownItem onClick={() => {this.new_meal_list(0)}}>Alphabetical</DropdownItem>
//                         <DropdownItem onClick={() => {this.new_meal_list(1)}}>Area</DropdownItem>
//                         <DropdownItem onClick={() => {this.new_meal_list(2)}}>Category</DropdownItem>
//                     </DropdownButton>
//                 </InputGroup>

//                 <MealList key={this.state.filter + this.state.data.length} data={this.state.data[this.state.filter]}/>
//             </Container>
//         )
//     }
// }

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
    const [filter, setFilter] = useState(0)// 0: ABC, 1: Category, 2: Area
    const [data, setData] = useState([])
    const new_filter = f => {
        setFilter(f)
    }
    
    useEffect(_ => {
        async function wrapper() {
            setData(await fetch_meals())
        }

        wrapper()
    }, [])

    
    return (
        <Container>
            <InputGroup size='md' className='pt-4'>
                <FormControl placeholder='Search meals...'/>
                <DropdownButton title='Filter by:'>
                    <DropdownItem onClick={() => {new_filter(0)}}>Alphabetical</DropdownItem>
                    <DropdownItem onClick={() => {new_filter(1)}}>Area</DropdownItem>
                    <DropdownItem onClick={() => {new_filter(2)}}>Category</DropdownItem>
                </DropdownButton>
            </InputGroup>

            <MealList key={filter + data.length} data={data[filter]}/>
        </Container>
    )
}

export default Search