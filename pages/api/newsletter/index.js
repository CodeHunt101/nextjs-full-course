const handler = (req, res) => {
  if (req.method === 'POST') {
    const userEmail = req.body.email
    // res.status(200).json({ message: 'works' })

    if (!userEmail || !userEmail.includes('@')) {
      res.status(422).json({ message: 'Invalid email address' })
      return
    }

    console.log(userEmail)
    res.status(201).json({ message: 'Signed up!' })
  }
}

export default handler
