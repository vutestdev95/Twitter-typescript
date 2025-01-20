import express, { json } from 'express'
import usersRouter from '~/routes/users.routes'
import { databaseService } from '~/services/database.services'

const app = express()
const port = 8000
app.use(json())
app.use('/users', usersRouter)

app.listen(port, () => {
  databaseService.connectDatabase().catch(console.dir)
  console.log(`App listen on port ${port}`)
})
