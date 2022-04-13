import React from 'react'
import MyForm from './MyForm'

function Login() {
    const txt = 'Log in'
    return (
        <MyForm title={txt} nav_btn_txt={txt} modal_btn_txt={txt} flag={0}/>
    )
}

export default Login