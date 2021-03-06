if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const express = require('express')
const path = require('path')
const fs = require('fs')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const api = require('./routes')
const cors = require('cors')
const logger = require('./commons/utils/logger')
const HttpStatus = require('http-status-codes')

const rfs = require('rotating-file-stream')

const app = express()
const logDirectory = path.join(__dirname, 'log')
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

const accessLogStream = rfs('access.log', {
	interval: '1d',
	path: logDirectory
})

const swStats = require('swagger-stats')
app.use(swStats.getMiddleware({}))

if(process.env.NODE_ENV !== 'test') {
  app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms', { stream: accessLogStream }))
  app.use(morgan('dev'))
}

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/api', api)
app.use('/admin', express.static(__dirname + '/reviewer/build'))
app.use('/', express.static(__dirname + '/adminpanel/build'))


// catch 404 and forward to error handler
app.use(function (req, res, next) {
	const err = new Error('Not Found')
	err.status = HttpStatus.NOT_FOUND
	next(err)
})

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message
	res.locals.error = req.app.get('env') === 'development' ? err : {}

	if(process.env.NODE_ENV !== 'test') {
    logger.error(err)
  }
	res.sendStatus(err.status || HttpStatus.INTERNAL_SERVER_ERROR)
})

module.exports = app
