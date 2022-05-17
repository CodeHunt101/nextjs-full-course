import classes from './newsletter-registration.module.css'
import { useRef, useContext } from 'react'
import NotificationContext from '../../store/notification-context'

const NewsletterRegistration = () => {
  const emailInputRef = useRef()
  const notificationCtx = useContext(NotificationContext)

  const registrationHandler = async (event) => {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value

    notificationCtx.showNotification({
      title: 'Signining up...',
      message: 'Registering for newsletter',
      status: 'pending',
    })

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: enteredEmail,
        }),
      })

      let data
      if (response.ok) {
        data = await response.json()
      } else {
        throw new Error(response.json().message || 'Something went wrongyyy')
      }

      notificationCtx.showNotification({
        title: 'Success!',
        message: 'Successfully registered for newsletter',
        status: 'success',
      })
    } catch (error) {
      notificationCtx.showNotification({
        title: 'Error!',
        message: error.message || 'Something went wrong',
        status: 'error',
      })
    }
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            aria-label="Your email"
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  )
}

export default NewsletterRegistration
