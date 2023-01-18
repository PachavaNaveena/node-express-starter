import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {ErrorHandler} from './errors'
import routes from './routes'

import config from './config'
const errorHandler = new ErrorHandler()

const app = express()
const port = config.app.port

app.use(cors())

// parse application/json - Default limit is 100kb seems small so increased it here
app.use(bodyParser.json({limit: '2mb', type: '*/json'}))

// Add Routers
app.use('/', routes)

// Error handlers must be the last thing added before the listen
app.use(errorHandler.handleExpressError)

// eslint-disable-next-line
app.listen(port, () => console.log(`Api listening on port ${port}!`))
