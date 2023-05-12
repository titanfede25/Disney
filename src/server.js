import express from "express";
import passport from "passport";
import personajesController from "./controllers/personajesController.js";
import {jwtStrategy} from "./common/jwt.strategy.js"

const app = express();
const port = 3001;
app.use(express.json());

passport.use(jwtStrategy);
app.use(passport.initialize());

app.use("", personajesController)

app.listen (port, ()=>{
    console.log(`EJEMPLO ${port}`)
})

