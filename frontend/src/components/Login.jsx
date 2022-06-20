import React from 'react'
import MyForm from './MyForm'

function Login(props) {
    const txt = 'Log in'
    const handle_login = props.handle_login

    return (
        <MyForm 
            title={txt} 
            nav_btn_txt={txt} 
            modal_btn_txt={txt} 
            flag={0} 
            handle_login={handle_login}/>
    )
}

export default Login