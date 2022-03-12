import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import { Link } from 'react-router-dom'
import '../styles/MealThumbnail.css'

function MealThumbnail(props) {
    const data = props.data
    return (
        <Col>
            <Link className='link' to={`/meals/${data.idMeal}`}>
                <Card>
                    <Card.Img src={data.strMealThumb} loading='lazy'/> {/*https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img#attr-decoding*/}

                    <Card.Body>
                        <Card.Title as='h3'>{data.strMeal}</Card.Title>
                    </Card.Body>
                </Card>
            </Link>
        </Col>
    )
}

export default MealThumbnail
