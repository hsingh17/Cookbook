import React from 'react'
import '../styles/MealCard.css'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

function parse_instructions(data) {
    // Split instructions by newline and filter out any blank lines
    const str = data.strInstructions
    let instructions = str.split('\r\n')
    instructions = instructions.filter(instr => instr !== '')
    return instructions        
}
    
function parse_ingredients_measures(data, type) {
    // Type tells us if we want to filter the ingredients or measures
    const filter_type = (type) ? 'strIngredient' : 'strMeasure'

    // Get all the properties that are non-empty and relate to the ingredient
    const props = Array.from(Object.keys(data)).filter(prop => {
        return prop.includes(filter_type) && data[prop] !== '' && data[prop] !== ' '
    })

    // Get the ingredients from the previous properties
    const values = props.map(key => data[key]) 

    return values
}

function MealCard(props) {
    const { meals } = props.data || {} // https://stackoverflow.com/questions/25187903/what-do-curly-braces-around-javascript-variable-name-mean
    const valid = meals !== undefined
    const meal = (valid) ? meals[0] : {}
    const meal_obj = {
        name            : (valid) ? meal.strMeal : '',
        category        : (valid) ? meal.strCategory : '',
        area            : (valid) ? meal.strArea : '',
        instructions    : (valid) ? parse_instructions(meal) : [],
        thumb           : (valid) ? meal.strMealThumb : '',
        youtube         : (valid) ? meal.strYoutube : '',
        ingredients     : (valid) ? parse_ingredients_measures(meal, 1) : [],
        measures        : (valid) ? parse_ingredients_measures(meal, 0) : []    
    }

    return (
        <Container>
            <Row>
                <h1>{meal_obj.name}</h1>
            </Row>

            <Row>
                <Col md={6}> 
                    <Image id='food-img' fluid='true' src={meal_obj.thumb} alt={`${meal_obj.name}-img`}></Image>
                </Col>

                <Col md={6}>
                    <div>
                        <h2>What do you need to make this dish?</h2>
                        <ul>
                        {   
                            meal_obj.ingredients.map((val, idx) => {
                                return (
                                    <li key={idx}>
                                        {val}
                                        <i>
                                            {meal_obj.measures[idx] !== '' ? `- ${meal_obj.measures[idx]}` : ''}
                                        </i> 
                                    </li>
                                )
                            })
                        }
                        </ul>
                    </div>
                </Col>
            </Row>
            
            <Row>
                <div>
                    <h1>Let's get cooking!</h1>
                    <ol>
                        {
                            meal_obj.instructions.map((val, idx) => {
                                return (<li key={idx}>{val}</li>)
                            })
                        }
                    </ol>
                </div>
            </Row>
        </Container>
    )
}

export default MealCard