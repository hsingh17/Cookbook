import React, { useEffect } from 'react'
import Alert from 'react-bootstrap/Alert'

function ErrorAlert(props) {
    const show = props.show
    const set_alert_off = props.set_alert_off
    const variant = props.variant
    const msg = props.msg

    useEffect(_ => {
        const id = setTimeout(_ => {
            set_alert_off(id)
        }, 5000)
    })

    return (
        <>
            {show && <Alert variant={variant}>{msg}</Alert>}
        </>
    )
}

export default ErrorAlert