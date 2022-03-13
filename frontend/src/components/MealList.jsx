import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import MealThumbnail from './MealThumbnail'

function get_list(cat, search_term, data) {
    let { meals } = data
    if (meals === null) { return }  // Fetch is not complete if this is true
    
    // If search_term != the category, user wants to filter by some meal name
    if (search_term !== cat.toLowerCase()) {
        meals = meals.filter(meal => { return meal.strMeal.toLowerCase().indexOf(search_term) !== -1 })
    }
    if (!meals.length) { return }    // Nothing matches against the search term

    return (
        <Container key={cat + meals.length}>
            <h1 className='display-4'>{cat}</h1>
            <hr />
            <Row key={cat} xs={1} md={2} lg={3} className='g-4'>
            {
                meals.map(meal => {
                    return (
                        <MealThumbnail key={meal.idMeal} data={meal} />
                    )
                })
            }
            </Row>
        </Container>
    )
}

function MealList(props) {
    const data = (props.data === undefined) ? {} : props.data
    const search_term = (props.search_term).toLowerCase()
    return (
        <Container>
            {
                Array.from(Object.keys(data)).map(cat => {
                    return (get_list(cat, search_term, data[cat]))
                })
            }
        </Container>            
    )
}

export default MealList