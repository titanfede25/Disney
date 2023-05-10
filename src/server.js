import express from "express";
import PizzaController from "./controllers/pizzaController.js";

const app = express();
const port = 3001;
app.use(express.json());

app.use("", PizzaController)

app.listen (port, ()=>{
    console.log(`EJEMPLO ${port}`)
})

