import { Router } from 'express';
import Pizza from '../models/pizza.js'; 
import {getAll,getById,create,update,deleteById} from '../services/pizzaService.js';

const router = Router();
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
})
export default router;
