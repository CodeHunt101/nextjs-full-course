import { useRef } from 'react'

function HomePage() {
  const emailInputRef = useRef()
  const feedbackInputRef = useRef()

  const submitFormHanlder = (e) => {
    e.preventDefault()
    const enteredEmail = emailInputRef.current.value
    const enteredFeedback = feedbackInputRef.current.value
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHanlder}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type={'email'} id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef} />
        </div>
        <button>Send Feedback</button>
      </form>
    </div>
  )
}

export default HomePage
