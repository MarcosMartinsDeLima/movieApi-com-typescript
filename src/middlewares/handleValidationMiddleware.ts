import {Request,Response,NextFunction} from 'express'
import { validationResult } from 'express-validator'

export const validate = (req:Request,resp:Response,next:NextFunction) => {
    const errors = validationResult(req)

    if(errors.isEmpty()){
        return next()
    }

    const extractedErros: object[] =[]

    errors.array().map(
        (erro) => extractedErros.push({[erro.type]:erro.msg})
    )

    return resp.status(422).json({errors:extractedErros})
}