import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'
import { mkdirSync, appendFileSync, existsSync } from 'node:fs'

const logEvents = (message, logName) => {
    //message
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`
    const logContent = `${dateTime}\t${uuid()}\t${message}\n`

    //path
    const directoryPath = './logs'
    const filePath = `${directoryPath}/${logName}`

    try {
        if (!existsSync(directoryPath)) {
            mkdirSync(directoryPath)
        }
        appendFileSync(filePath, logContent)
    } catch (error) {
        console.log(error)
    }
}

const logger = (req, res, next) => {
    logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, 'reqLog.txt')
    next()
}

export default logger
export { logger }