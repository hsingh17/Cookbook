import React, { useEffect, useState } from 'react'

function Favorites() {
    const [favMeals, setFavMeals] = useState([]) 

    useEffect(_ => {
        const get_favorite = async _ => {
            const URL = (
                            (process.env.NODE_ENV === 'development') ? 
                            process.env.REACT_APP_DEV_URL : 
                            process.env.REACT_APP_PROD_URL
                        ) + '/db/favorites'
        
            const response = await fetch(URL, { credentials : 'include' })
            const obj = await response.json()
            setFavMeals(obj.meals)
        }

        get_favorite()
    }, [])

    return (
        <>
            {Array.from(favMeals).map(e => {
                return <h1 key={e}>{e}</h1>
            })}

            <h1>{favMeals.length}</h1>
        </>
    )
}

export default Favorites