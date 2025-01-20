import { Collection, Db, MongoClient, ServerApiVersion } from 'mongodb'
import 'dotenv/config'
import User from '~/models/schemas/User.schema'

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_USERPASSWORD}@twitter.vrhly.mongodb.net/?retryWrites=true&w=majority&appName=twitter`

class DatabaseServices {
  private client: MongoClient
  private db: Db
  constructor(uri: string) {
    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
      }
    })
    this.db = this.client.db(process.env.DB_NAME)
  }

  public get users(): Collection<User> {
    return this.db.collection<User>(process.env.DB_USERS_COLLECTION!)
  }

  public async connectDatabase() {
    try {
      await this.db.command({ ping: 1 })
      console.log('Pinged your deployment. You successfully connected to MongoDB!')
    } catch {
      throw new Error('Connection fail')
    }
  }
}

export const databaseService = new DatabaseServices(uri)
