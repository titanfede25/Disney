import sql from 'mssql';
import configDB from '../models/db.js';

export const getAllCharacters = async () => {
    const conn      = await sql.connect(configDB);
    const results   = await conn.request().query('SELECT Imagen, Nombre, IDPersonaje FROM Personajes');
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
    const results   = await conn.request().input('pId', sql.Int, id).query('DELETE FROM Personajes where IDPersonaje = @pId');
    return results.recordset;
}
export const getDetailedCharacter = async (id) => {
    const conn      = await sql.connect(configDB);
    const results1  = await conn.request().input('pId', sql.Int, id).query('select * from Personajes where IDPersonaje = @pId;'); 
    const results2  = await conn.request().input('pId', sql.Int, id).query('select Peliculas.* from Peliculas inner join Conexiones on Peliculas.IDPelicula = Conexiones.IDPelicula inner join Personajes on Conexiones.IDPersonaje = Personajes.IDPersonaje where Personajes.IDPersonaje = @pId;');
    results1.recordset[0].movies= results2.recordset;
    return results1.recordset[0]; 
}