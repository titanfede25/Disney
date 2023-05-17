import { Router } from 'express';
import Pelicula from '../models/Pelicula.js'; 
import {getAllMovies} from '../services/peliculasService.js'

const router = Router();

router.get ('/movies', async(req, res)=>{
    const peliculas        = await getAllMovies();
    res.status(200).send(peliculas);
})