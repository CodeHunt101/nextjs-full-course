import { MongoClient } from 'mongodb'

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { email, name, message } = req.body

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input' })
      return
    }

    // Store it in a database
    const newMessage = {
      email,
      name,
      message,
    }

    let client

    const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.a28iu.mongodb.net/${process.env.DB_NAME_PROJECT}?retryWrites=true&w=majority`

    try {
      console.log('connectionString', connectionString)
      client = await MongoClient.connect(connectionString)
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database' })
      return
    }

    const db = client.db(process.env.DB_NAME_PROJECT)

    try {
      const result = await db.collection('messages').insertOne(newMessage)
      newMessage.id = result.insertedId
    } catch (error) {
      client.close()
      res.status(500).json({ message: 'Storing message failed' })
      return
    }

    client.close()

    res
      .status(201)
      .json({ message: 'Successfully stored message!', message: newMessage })
  }
}

export default handler
