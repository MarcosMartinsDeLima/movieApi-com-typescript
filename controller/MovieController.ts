import {Request,Response} from 'express'
import { movieModel } from '../models/Movie'
import logger from '../config/logger'
import { REPLCommand } from 'repl'

export async function createMovie(req:Request,resp:Response){
    try {
        const data = req.body
        const movie = await movieModel.create(data)
        resp.status(201).json(movie)
    } catch (error) {
        logger.error(error)
        return resp.status(500).json({message:"erro, por favor tente novament mais tarde!"})
    }
}

export async function getMovieById(req:Request,resp:Response) {
    try {
        const id = req.params.id
        const movie = await movieModel.findById(id)

        if(!movie){
            return resp.status(404).json({message:"Filme não encontrado!"})
        }

        resp.status(200).json({"movie":movie})

    } catch (error) {
        logger.error(error)
        return resp.status(500).json({message:"erro, por favor tente novament mais tarde!"})
    }
}


export async function getAllMovies(req:Request,resp:Response){
    try {
        const movies = await movieModel.find()
        resp.status(200).json({movie:movies})
    } catch (error) {
        logger.error(error)
        return resp.status(500).json({message:"erro, por favor tente novament mais tarde!"})
    }
}

export async function removeMovie(req:Request,resp:Response){
    try{
    const id = req.params.id
    const movie = await movieModel.findById(id)


    if(!movie){
        return resp.status(404).json({message:"Filme não encontrado!"})
    }

    await movie.deleteOne({_id:id})
    resp.status(200).json({message:"filme deletado dos registros!"})
    }
    catch(error){
        logger.error(error)
        return resp.status(500).json({message:"erro, por favor tente novament mais tarde!"})
    }

}


export async function updateMovie(req:Request,resp:Response){
    try{
    const id = req.params.id
    const data = req.body
    const movie = await movieModel.findById(id)

    if(!movie){
        return resp.status(404).json({message:"Filme não encontrado!"})
    }
    await movieModel.findByIdAndUpdate(id)
    resp.status(200).json({message:"filme Atualizado!"})
    }
    catch(error){
        logger.error(error)
        return resp.status(500).json({message:"erro, por favor tente novament mais tarde!"})
    }
    
}