import { Router } from 'express';
import Personaje from '../models/personaje.js'; 
import {getAllCharacters, createCharacter, updateCharacter, deleteCharacter, getDetailedCharacter} from '../services/personajesService.js'

const router = Router();

router.get ('/characters', async(req, res)=>{
    console.log(req.query.name);
    console.log(req.query.age);
    console.log(req.query.weight);
    console.log(req.query.movie);
    const personajes        = await getAllCharacters();
    res.status(200).send(personajes);
})
router.post ('/characters', async(req, res)=>{
    let status = 201;
    const personaje     = new Personaje();
    personaje.Imagen    = req.body.Imagen;
    personaje.Nombre    = req.body.Nombre;
    personaje.Edad      = req.body.Edad;
    personaje.Peso      = req.body.Peso;
    personaje.Historia  = req.body.Historia;
    const creado        = await createCharacter(personaje);
    if(creado==null){
        status = 400;
    }
    res.status(status).send(creado);
})
router.put ('/characters/:id', async(req, res)=>{
    let status = 200;
    const id            = req.params.id;
    const personaje     = new Personaje();
    personaje.Imagen    = req.body.Imagen;
    personaje.Nombre    = req.body.Nombre;
    personaje.Edad      = req.body.Edad;
    personaje.Peso      = req.body.Peso;
    personaje.Historia  = req.body.Historia;
    const cambiado      = await updateCharacter(personaje, id);
    if(req.params.id < 0 || cambiado == null){
        status = 400;
    }
    res.status(status).send(cambiado);
})
router.delete ('/characters/:id', async(req, res)=>{
    let status = 200;
    if(req.params.id < 0){
        status = 400;
    }
    const idBorrado     = await deleteCharacter(req.params.id);
    res.status(status).send(idBorrado);
})
router.get ('/characters/:id', async(req, res)=>{ 
    let status = 200;
    const id               = req.params.id;
    const personaje    = await getDetailedCharacter(id);
    if(personaje == null){
        status = 404;
    }
    if (id < 0){
        status = 400;
    }
    res.status(status).send(personaje);
})

export default router;