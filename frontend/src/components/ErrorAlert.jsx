import React from 'react'
import Alert from 'react-bootstrap/Alert'

function ErrorAlert(props) {
    const show = props.show
    const variant = props.variant
    const msg = props.msg

    return (
        <>
            {show && <Alert variant={variant}>{msg}</Alert>}
        </>
    )
}

export default ErrorAlert