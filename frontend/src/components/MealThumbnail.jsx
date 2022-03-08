import React from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'

function MealThumbnail(props) {
    const data = props.data
    return (
        <Col>
            <Card>
                <Card.Img src={data.strMealThumb} loading='lazy' /> {/*https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Img#attr-decoding*/}

                <Card.Body>
                    <Card.Title as='h3'>{data.strMeal}</Card.Title>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default MealThumbnail
