import express, { json, NextFunction, Request, Response } from 'express'
import usersRouter from '~/routes/users.routes'
import { databaseService } from '~/services/database.services'

const app = express()
const port = 8000

app.use(json())
app.use('/users', usersRouter)

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({
    error: err.message
  })
})

app.listen(port, () => {
  databaseService.connectDatabase().catch(console.dir)
  console.log(`App listen on port ${port}`)
})
