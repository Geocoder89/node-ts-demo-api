import express from 'express'

import dotenv from 'dotenv'
dotenv.config()
import config from 'config'
import connectDB from './utils/db'
import log from './utils/logger'
import routes from './routes'


import deserializeUser from './middleware/deserializeUser'



const port = config.get<number>('port')
const app = express ()



app.use(express.json())
app.use(deserializeUser)
app.listen(port,async ()=>{
    log.info(`App is listening on port ${port}`)
    await connectDB()

    routes(app)
})