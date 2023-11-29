import {Router,Request,Response} from 'express'
import { getMovieById, createMovie, getAllMovies, removeMovie, updateMovie } from '../controller/MovieController'
import { validate } from './middlewares/handleValidationMiddleware'
import { movieValidation } from './middlewares/movieValidation'

const router = Router()

export default router.get('/teste',(req:Request,resp:Response)=>{
    resp.status(200).json({message:"Api funcionando"})
})
.post('/movie',movieValidation(),validate,createMovie)
.get('/movie/:id',getMovieById)
.get('/movie',getAllMovies)
.get('/movie/:id/delete',removeMovie)
.patch('/movie/:id/update',movieValidation(),validate,updateMovie)