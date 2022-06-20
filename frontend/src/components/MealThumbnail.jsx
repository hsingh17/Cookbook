import React, { useEffect, useRef } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import '../styles/MealThumbnail.css'

function MealThumbnail(props) {
    const data = props.data
    const card_img = useRef(null)
    // Intersection Observer for lazy loading of card image
    // https://medium.com/the-non-traditional-developer/how-to-use-an-intersectionobserver-in-a-react-hook-9fb061ac6cb5
    // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    // https://medium.com/walmartglobaltech/lazy-loading-images-intersectionobserver-8c5bff730920
    const observer = useRef(new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const { isIntersecting } = entry
            if (isIntersecting && card_img !== null) {
                card_img.current.src = data.strMealThumb
                observer.current.disconnect()
            }
        })
    }))

    useEffect(_ => { 
        observer.current.observe(card_img.current) 
    }, [])

   
    return (
        <Col>
            <Link className='link' to={`/meals/${data.idMeal}`}>
                <Card>
                    <Card.Img ref={card_img} /> 
                    <Card.Body>
                        <Card.Title as='h3'>{data.strMeal}</Card.Title>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    )
}

export default MealThumbnail
