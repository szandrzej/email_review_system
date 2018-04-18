const winston = require('winston')
const DailyRotateFile = require('winston-daily-rotate-file')

const transport = new DailyRotateFile({
  filename: './log/log',
  datePattern: 'yyyy-MM-dd.',
  prepend: true,
  level: process.env.ENV === 'prod' ? 'info' : 'debug'
})

const logger = new winston.Logger({
  transports: [
    transport,
    new winston.transports.Console({
      colorize: true,
      timestamp: true,
      prettyPrint: true,
      showLevel: true
    })
  ]
})

module.exports = logger
