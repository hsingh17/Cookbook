import React from 'react'
import Container from 'react-bootstrap/Container'

function get_list(filter, data) {
    const { meals } = data
    if (meals === null) { return }
    return (
        <Container key={filter} className="mb-4">
            <h1 className='display-4'>{filter}</h1>
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
    return (
        <Container>
            {
                Array.from(Object.keys(data)).map(filter => {
                    return (get_list(filter, data[filter]))
                })
            }
        </Container>            
    )
}

export default MealList