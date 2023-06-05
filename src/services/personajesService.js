import sql from 'mssql';
import configDB from '../models/db.js';

export const filteredCharacters = async (personaje) => {
    let conn      = await sql.connect(configDB);
    let results;
    let query;
    if (personaje.IdPelicula){
        query = 'SELECT Personajes.Imagen, Personajes.Nombre, Personajes.IDPersonaje FROM Peliculas inner join Conexiones on Peliculas.IDPelicula = Conexiones.IDPelicula inner join Personajes on Conexiones.IDPersonaje = Personajes.IDPersonaje Where Peliculas.IDPelicula = @pIdMovie and';
    }
    else{
        query = 'SELECT Personajes.Imagen, Personajes.Nombre, Personajes.IDPersonaje FROM Personajes Where';
    }
    if (personaje.Nombre){
        query = query + ' Personajes.Nombre = @pName and';
    }
    if (personaje.Edad){
        query = query + ' Personajes.Edad = @pAge and';
    }
    if (personaje.Peso){
        query = query + ' Personajes.Peso = @pWeight and';
    }
    query = query.slice(0, -4);
    results   = await conn.request().input('pName', sql.VarChar, personaje.Nombre).input('pAge', sql.Int, personaje.Edad).input('pWeight', sql.Float, personaje.Peso).input('pIdMovie', sql.Int, personaje.IdPelicula).query(query);
    return results.recordset; 
}

export const getAllCharacters = async () => {
    const conn      = await sql.connect(configDB);
    const results   = await conn.request().query('SELECT Personajes.Imagen, Personajes.Nombre, Personajes.IDPersonaje FROM Personajes');
    return results.recordset;
}

export const createCharacter = async (personaje) => {
    const conn      = await sql.connect(configDB);
    const results   = await conn.request().input('pImagen', sql.VarChar, personaje.Imagen).input('pNombre', sql.VarChar, personaje.Nombre).input('pEdad', sql.Int, personaje.Edad).input('pPeso', sql.Float, personaje.Peso).input('pHistoria', sql.VarChar, personaje.Historia).query('INSERT INTO Personajes (Imagen, Nombre, Edad, Peso, Historia) VALUES (@pImagen, @pNombre, @pEdad, @pPeso, @pHistoria)');
    return results.rowsAffected;
}

export const updateCharacter = async (personaje, id) => {
    const conn      = await sql.connect(configDB);
    const results   = await conn.request().input('pId', sql.Int, id).input('pNombre', sql.VarChar, personaje.Nombre).input('pimagen', sql.VarChar, personaje.Imagen).input('pEdad', sql.Int, personaje.Edad).input('pPeso', sql.Float, personaje.Peso).input('pHistoria', sql.VarChar, personaje.Historia).query('UPDATE Personajes SET Imagen=@pImagen, Nombre=@pNombre, Edad=@pEdad, Peso=@pPeso, Historia = @pHistoria WHERE IDPersonaje=@pId');
    return results.rowsAffected;
}

export const deleteCharacter = async (id) => {
    const conn      = await sql.connect(configDB);
    const results1   = await conn.request().input('pId', sql.Int, id).query('DELETE FROM Conexiones where IDPersonaje = @pId');
    const results2   = await conn.request().input('pId', sql.Int, id).query('DELETE FROM Personajes where IDPersonaje = @pId');
    return results1.recordset;
}

export const getDetailedCharacter = async (id) => {
    const conn      = await sql.connect(configDB);
    const results1  = await conn.request().input('pId', sql.Int, id).query('select * from Personajes where IDPersonaje = @pId;'); 
    const results2  = await conn.request().input('pId', sql.Int, id).query('select Peliculas.* from Peliculas inner join Conexiones on Peliculas.IDPelicula = Conexiones.IDPelicula inner join Personajes on Conexiones.IDPersonaje = Personajes.IDPersonaje where Personajes.IDPersonaje = @pId;');
    results1.recordset[0].Peliculas= results2.recordset;
    return results1.recordset[0]; 
}