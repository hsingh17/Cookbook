import React from 'react'
import Container from 'react-bootstrap/Container'

function get_list(cat, search_term, data) {
    let { meals } = data
    if (meals === null) { return }  // Fetch is not complete if this is true
    
    // Filter results by search term instead of category
    if (search_term !== cat.toLowerCase()) {
        meals = meals.filter(meal => { return meal.strMeal.toLowerCase().indexOf(search_term) !== -1 })
    }
    if (!meals.length) { return }    // Nothing matches against the search term

    return (
        <Container key={cat} className="mb-4">
            <h1 className='display-4'>{cat}</h1>
            <hr />
            {
                meals.map(meal => {
                    return (
                        <h3 key={meal.idMeal}>{meal.strMeal}</h3>
                    )
                })
            }
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