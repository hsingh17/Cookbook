import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import MealThumbnail from './MealThumbnail'

function Favorites() {
    const [favMeals, setFavMeals] = useState([]) 

    useEffect(_ => {
        const get_favorite = async _ => {
            if (document.cookie === '') { return }  // Don't do anything if no cookie
            const URL = (
                            (process.env.NODE_ENV === 'development') ? 
                            process.env.REACT_APP_DEV_URL : 
                            process.env.REACT_APP_PROD_URL
                        ) 
        
            let response = await fetch(URL + '/db/favorites', { credentials : 'include' })
            const obj = await response.json() // The meal IDs of the user's favorite meals

            // Get the full data of the user's favorite meals from the meal IDs
            const meal_data = await Promise.all(Array.from(obj.meals).map(async meal_id => {
                response = await fetch(URL + `/api/search?id=${meal_id}&type=i`)
                const data = await response.json()
                return data 
            }))

            setFavMeals(meal_data)
        }

        get_favorite()
    }, [])

    return (
        <Container>
            <Row xs={1} md={2} lg={3} className='g-4'>
                {
                    Array.from(favMeals).map(meal => {
                        return <MealThumbnail key={meal.meals[0].idMeal} data={meal.meals[0]} />
                    })
                }
            </Row>
        </Container>
    )
}

export default Favorites