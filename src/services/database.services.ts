import { MongoClient, ServerApiVersion } from 'mongodb'
import 'dotenv/config'

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_USERPASSWORD}@twitter.vrhly.mongodb.net/?retryWrites=true&w=majority&appName=twitter`

class DatabaseServices {
  private client: MongoClient

  constructor(uri: string) {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
  }

  public async connectDatabase() {
    try {
      await this.client.db('twitter-2025').command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } finally {
      await this.client.close()
    }
  }
}

export const databaseService = new DatabaseServices(uri)
