//enviroment variables
require('dotenv').config()
import express from 'express'
import config from 'config'

//database connection
import db from '../config/db'

//logger
import logger from '../config/logger'

//middleware
import morganMiddleware from './middlewares/morganMiddleware'

const app = express()

app.use(express.json())

import router from './router'
app.use(morganMiddleware)
app.use('/api/',router)

//port
const port = config.get<number>('port')

app.listen(port,()=>{
    db()
    logger.info(`app odando na porta ${port}`)
})