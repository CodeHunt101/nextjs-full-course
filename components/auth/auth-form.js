import { useState, useRef } from 'react'
import classes from './auth-form.module.css'
import { signIn } from 'next-auth/client'

const createUser = async (email, password) => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const data = await response.json()

  if (!response.ok) {
    console.log('error')
    throw new Error(data.message || 'Something went wrong')
  }

  console.log(data)
}

function AuthForm() {
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const [isLogin, setIsLogin] = useState(true)

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState)
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value

    // optional: Add validation

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      })
      if (!result.error) {
        // set some auth state
      }
    } else {
      try {
        const result = await createUser(enteredEmail, enteredPassword)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default AuthForm
