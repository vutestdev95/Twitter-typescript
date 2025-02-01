import express, { json } from 'express'
import usersRouter from '~/routes/users.routes'
import { databaseService } from '~/services/database.services'
import { defaultErrorHandler } from '~/middlewares/errors.middlewares'

const app = express()
const port = 8000

app.use(json())
app.use('/users', usersRouter)

app.use(defaultErrorHandler)

app.listen(port, () => {
  databaseService.connectDatabase().catch(console.dir)
  console.log(`App listen on port ${port}`)
})
