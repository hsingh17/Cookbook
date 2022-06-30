import React, { useEffect, useState, useRef } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import MealThumbnail from './MealThumbnail'
import CustomSpinner from './CustomSpinner'
import '../styles/Favorites.css'

const 
    SELECTED = 'rgb(169, 169, 169)', 
    UNSELECTED = 'transparent', 
    URL = (
        (process.env.NODE_ENV === 'development') ? 
        process.env.REACT_APP_DEV_URL : 
        process.env.REACT_APP_PROD_URL
    ) 

async function get_meal_data(obj) {
    // Get the full data of the user's favorite meals from the meal IDs
    return await Promise.all(Array.from(obj.meals).map(async meal_id => {
        const response = await fetch(URL + `/api/search?id=${meal_id}&type=i`)
        const data = await response.json()
        return data 
    }))
}

function Favorites(props) {
    const logged_in = props.logged_in
    const [deleteMode, setDeleteMode] = useState(false) 
    const [loaded, setLoaded] = useState(false) 
    const [favMeals, setFavMeals] = useState([]) 
    const switch_ref = useRef()
    let marked_meals = useRef(new Set())   // Meals that are marked for deletion

    useEffect(_ => {
        const get_favorite = async _ => {
            if (!logged_in) { return }  // Don't do anything if no cookie
            
            let response = await fetch(URL + '/db/favorites', { credentials : 'include' })
            const obj = await response.json() // The meal IDs of the user's favorite meals
            const meal_data = await get_meal_data(obj)
            setLoaded(true)
            setFavMeals(meal_data)
        }

        get_favorite()
    }, [logged_in])

    const handle_switch = _ => {
        setDeleteMode(!deleteMode)   // Toggle delete mode
    }

    const mark_delete = e => {
        let div = e.target
        const meal_id = div.id
        const cur_background = div.style.backgroundColor
        div.style.backgroundColor = (cur_background === SELECTED) ? UNSELECTED : SELECTED
        
        if (marked_meals.current.has(meal_id)) {
            marked_meals.current.delete(meal_id)
        } else {
            marked_meals.current.add(meal_id)
        }
    }

    const handle_delete = async _ => {
        setLoaded(false)
        const URL = (
            (process.env.NODE_ENV === 'development') ? 
            process.env.REACT_APP_DEV_URL : 
            process.env.REACT_APP_PROD_URL
        ) + '/db/favorites'
        
        const delete_arr = [...marked_meals.current]
        const delete_obj = {meals : delete_arr}

        const response = await fetch(URL, {
            method      :   'DELETE',
            body        :   JSON.stringify(delete_obj),
            credentials :   'include',
            headers     :   {
                'Content-Type' : 'application/json'
            }
        })
        
        const updated_meals = await response.json()
        const meal_data = await get_meal_data(updated_meals)
        
        marked_meals.current.clear()
        setDeleteMode(false)
        setLoaded(true)
        setFavMeals(meal_data)
    }

    if (!logged_in) {   // User is not logged in yet
        return (
            <Container>
                <h1>Please login or sign up to use this feature.</h1>
            </Container>
        )
    }

    if (!loaded) {  // User logged in but their favorites haven't been fetched yet
        return (<CustomSpinner msg={'Loading Favorites'} />)
    }

    return (
        <Container id='container'>
            <Row>
                <Col>
                    <Button 
                        disabled={!deleteMode}
                        onClick={handle_delete}>
                        Delete
                    </Button>
                </Col>

                <Col>
                    <Form>
                        <Form.Check 
                            type='switch'
                            label='Toggle Delete'
                            ref={switch_ref}
                            onClick={handle_switch}
                        />
                    </Form>
                </Col>
            </Row>
            <Row xs={1} md={2} lg={3} className='g-4'>
                {
                    Array.from(favMeals).map(meal => {
                        return (
                            <div className='thumbnail' key={meal.meals[0].idMeal}>
                                <MealThumbnail data={meal.meals[0]} show_fav={false} />
                                <div 
                                    id={meal.meals[0].idMeal} 
                                    className={deleteMode ? 'overlay show' : 'overlay hide'}
                                    onClick={e => {mark_delete(e)}}>
                                </div>
                            </div>
                        )
                    })
                }
            </Row>
        </Container>
    )
}

export default Favorites