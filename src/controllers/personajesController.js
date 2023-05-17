import { Router } from 'express';
import Personaje from '../models/personaje.js'; 
import {getAllCharacters, createCharacter, updateCharacter, deleteCharacter, getDetailedCharacter} from '../services/personajesService.js'

const router = Router();

router.get ('/characters', async(req, res)=>{
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
router.get ('/characters', async(req, res)=>{ /*seguir el viernes*/
    const name  = req.query.name;
    const age   = req.query.age;
    const movie = req.query.movie;

})







/*const router = Router();
router.get ('/:id', async(req, res)=>{
    let status = 200;
    if(req.params.id < 0){
        status = 400;
    }
    const object            = await getById(req.params.id);
    if(object==null){
        status = 404;
    }
    res.status(status).send(object);
})

router.get ('/', async(req, res)=>{
    const pizzas        = await getAll();
    res.status(200).send(pizzas);
})

router.delete ('/:id', async(req, res)=>{
    let status = 200;
    if(req.params.id < 0){
        status = 400;
    }
    const idBorrado     = await deleteById(req.params.id);
    res.status(status).send(idBorrado);
})

router.put ('/:id', async(req, res)=>{
    let status = 200;
    if(req.params.id < 0){
        status = 400;
    }
    const id            = req.params.id;
    const pizza         = new Pizza();
    pizza.Nombre        = req.body.Nombre;
    pizza.LibreGluten   = req.body.LibreGluten;
    pizza.Importe       = req.body.Importe;
    pizza.Descripcion   = req.body.Descripcion;
    const cambiado      = await update(pizza, id);
    if(cambiado==null){
        status = 404;
    }
    res.status(status).send(cambiado);
})
router.post('/', async(req, res)=>{
    let status = 201;
    const pizza         = new Pizza();
    pizza.Nombre        = req.body.Nombre;
    pizza.LibreGluten   = req.body.LibreGluten;
    pizza.Importe       = req.body.Importe;
    pizza.Descripcion   = req.body.Descripcion;
    const creado        = await create(pizza);
    if(creado==null){
        status = 400;
    }
    res.status(status).send(creado);
})*/
export default router;