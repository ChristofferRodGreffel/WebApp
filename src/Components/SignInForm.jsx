import React, { useRef, useState } from 'react'
import { FIREBASE_AUTH } from '../../firebase-config'
import { firebaseErrorsCodes } from '../../firebaseErrorCodes'
import { CustomSignIn } from '../Helperfunctions/CustomSignIn'

function SignInForm() {

    const [loading, setLoading] = useState(false)

    const formRef = useRef(null)

    // Function that calls our Sign in function, passing the values needed.
    const handleSignIn = (e) => {
        e.preventDefault()
        CustomSignIn(formRef, setLoading)
    }

    return (
        <form ref={formRef} onSubmit={handleSignIn}>
            <input type='email' disabled={loading} name='signInEmail' placeholder='Write email here...'></input>
            <input type='password' disabled={loading} name='signInPassword' placeholder='Write password here...'></input>

            <button type='submit' disabled={loading}>Sign in</button>
        </form>
    )
}

export default SignInForm