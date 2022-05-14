import { useRef, useState } from 'react'

function HomePage() {
  const [feedbackItems, setFeedbackItems] = useState([])

  const emailInputRef = useRef()
  const feedbackInputRef = useRef()

  const submitFormHanlder = async (e) => {
    e.preventDefault()
    const enteredEmail = emailInputRef.current.value
    const enteredFeedback = feedbackInputRef.current.value

    const reqBody = {
      email: enteredEmail,
      text: enteredFeedback,
    }

    const response = await fetch('/api/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    })
    const data = await response.json()
    console.log(data)
  }

  const loadFeedbackHandler = async () => {
    const response = await fetch('/api/feedback')
    const data = await response.json()
    setFeedbackItems(data.feedback)
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
      <hr />
      <button onClick={loadFeedbackHandler}>Load feedbacks</button>
      <ul>
        {feedbackItems.map((item) => (
          <li key={item.id}>
            {item.email} - {item.text}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HomePage
