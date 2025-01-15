import express, { json } from 'express'
import usersRouter from '~/routes/users.routes'
const app = express()
const port = 8000
app.use(json())
app.use('/users', usersRouter)

app.listen(port, () => {
  console.log(`App listen on port ${port}`)
})
