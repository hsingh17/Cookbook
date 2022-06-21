import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import '../styles/Recipe.css'

function parse_instructions(data) {
    // Split instructions by newline and filter out any blank lines
    const str = data.strInstructions
    let instructions = str.split('.')
    instructions = instructions.filter(instr => instr !== '')
    return instructions        
}
    
function parse_ingredients_measures(data, type) {
    // Type tells us if we want to filter the ingredients or measures
    const filter_type = (type) ? 'strIngredient' : 'strMeasure'

    // Get all the properties that are non-empty and relate to the ingredient
    const props = Array.from(Object.keys(data)).filter(prop => {
        return prop.includes(filter_type)   && 
                        data[prop] !== ''   && 
                        data[prop] !== ' '  && 
                        data[prop] !== null
    })

    // Get the ingredients from the previous properties
    const values = props.map(key => data[key]) 

    return values
}

function Recipe(props) {
    const [update, setUpdate] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
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

    const toggle_alert = e => {
        if (document.cookie !== '') { return } // No need to show tooltip alert
        setShowAlert(e.type === 'mouseover')     
    }

    const favorite_meal = async e => {
        if (document.cookie === '') { return }  // User not logged in

        e.target.style.color = '#B2BEB5'
        const URL = (
                            (process.env.NODE_ENV === 'development') ? 
                            process.env.REACT_APP_DEV_URL : 
                            process.env.REACT_APP_PROD_URL
                        ) + '/db/favorites'
        
        const meal_id_obj = { meal_id : meal.idMeal }
        const response = await fetch(URL, {
            method      :   'POST',
            body        :   JSON.stringify(meal_id_obj),
            credentials :   'include',
            headers     :   {
                'Content-Type' : 'application/json'
            }
        })
        const status = response.ok
        if (status) {   // Successfully favorited the meal
            setUpdate(!update)
        }
    }

    useEffect(_ => {
        async function wrapper() {
            const URL = (
                (process.env.NODE_ENV === 'development') ? 
                process.env.REACT_APP_DEV_URL : 
                process.env.REACT_APP_PROD_URL
            ) + `/db/meals?meal_id=${meal.idMeal}`
    
            const response = await fetch(URL)
            const obj = await response.json()
            document.getElementById('fav-cnt').textContent = obj.fav_cnt
       }

       wrapper()
    }, [update])
    
    return (
        <Container>
            <Row>
                <Col sm={10}>
                    <h1>{meal_obj.name}</h1>
                </Col>

                <Col sm={2} id='star-container'>
                    <i 
                        className='fa-solid fa-star'
                        id='recipe-star' 
                        onClick={e => {favorite_meal(e)}}
                        onMouseOver={e => {toggle_alert(e)}}
                        onMouseLeave={e => {toggle_alert(e)}}
                    >
                    </i>
                    <h1 id='fav-cnt'></h1>
                    <span 
                        id='warning-msg' 
                        className={showAlert ? 'visible' : 'invisible'}>
                        You must login for this!
                    </span>
                </Col>
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

export default Recipe