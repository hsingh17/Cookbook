import React from 'react'


function Error() {
    return (
        <h1>
            Hey how'd you get here! <code>{window.location.pathname}</code> is not a valid route!
        </h1>
    )
}
export default Error