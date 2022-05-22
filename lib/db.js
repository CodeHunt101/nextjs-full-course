import { MongoClient } from 'mongodb'

export const connectToDatabase = async () => {
  const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_CLUSTER}.a28iu.mongodb.net/${process.env.DB_NAME_PROJECT}?retryWrites=true&w=majority`
  const client = await MongoClient.connect(connectionString)

  return client
}
