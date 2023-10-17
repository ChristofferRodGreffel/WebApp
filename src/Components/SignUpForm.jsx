import React, { useRef, useState } from 'react'

import { CustomSignUp } from '../Helperfunctions/CustomSignUp'

function SignInForm() {

    const [loading, setLoading] = useState(false)

    const formRef = useRef(null)

    // Function that calls our Sign up function, passing the values needed.
    const handleSignUp = (e) => {
        e.preventDefault()
        CustomSignUp(formRef, setLoading)
    }

    return (
        <form ref={formRef} onSubmit={handleSignUp}>
            <input type='email' disabled={loading} name='signUpEmail' placeholder='Write email here...'></input>
            <input type='password' disabled={loading} name='signUpPassword' placeholder='Write password here...'></input>

            <button type='submit' disabled={loading}>Sign up</button>

        </form>
    )
}

export default SignInForm