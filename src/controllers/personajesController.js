import { Router } from 'express';
import Personaje from '../models/personaje.js'; 
import {getAllCharacters, createCharacter, updateCharacter, deleteCharacter, getDetailedCharacter} from '../services/personajesService.js'

const router = Router();

router.get ('/characters', async(req, res)=>{
    const lista = [req.query.name, req.query.age, req.query.weight, req.query.idMovie];
    const personajes        = await getAllCharacters(lista);
    res.status(200).send(personajes);
})
router.post ('/characters', async(req, res)=>{
    let status = 201;
    const personaje     = new Personaje();
    personaje.Imagen    = req.body.image;
    personaje.Nombre    = req.body.name;
    personaje.Edad      = req.body.age;
    personaje.Peso      = req.body.weight;
    personaje.Historia  = req.body.story;
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
    personaje.Imagen    = req.body.image;
    personaje.Nombre    = req.body.name;
    personaje.Edad      = req.body.age;
    personaje.Peso      = req.body.weight;
    personaje.Historia  = req.body.story;
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