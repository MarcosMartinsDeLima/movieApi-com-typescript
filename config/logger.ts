import winston from "winston";
import config  from "config";


const levels ={
    error:0,
    warn:1,
    info:2,
    http:3,
    debug:4
}

const level = ()=>{
    const env = config.get<string>('env') || 'development'
    const isdevelopment = env ==='development'
    return isdevelopment ? 'debug':"warn"
}

const colors = {
    error:'red',
    warn:'yellow',
    info:'blue',
    http:'green',
    debug:'green'
}

winston.addColors(colors)

const format = winston.format.combine(
    winston.format.timestamp({format:"YYYY-MM-DD HH:mm:ss"}),
    winston.format.colorize({all:true}),
    winston.format.printf(
        (info)=>`${info.timestamp}-${info.level}: ${info.message}`
    )
)

const transport = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename:"logs/all.log"
    })
]

const logger = winston.createLogger({
    level:level(),
    levels,
    format,
    transports:transport
})

export default logger