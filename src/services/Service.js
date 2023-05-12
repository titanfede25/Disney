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
    const results   = await conn.request().input('pId', sql.Int, id).query('select m.* from Personaje where IDPersonaje as m = @pId inner join Conexiones '); /*hay que terminar*/
    return results.recordset; 
}
/*export const getById = async (id) => {
    const conn      = await sql.connect(configDB);
    const results   = await conn.request().input('pId', sql.Int, id).query('SELECT * FROM Pizzas where Id = @pId');
    return results.recordset;
}
export const create = async (pizza) => {
    const conn      = await sql.connect(configDB);
    const results   = await conn.request().input('pNombre', sql.VarChar, pizza.Nombre).input('pLibreGluten', sql.Bit, pizza.LibreGluten).input('pImporte', sql.Float, pizza.Importe).input('pDescripcion', sql.VarChar, pizza.Descripcion).query('INSERT INTO Pizzas (Nombre, LibreGluten, Importe, Descripcion) VALUES (@pNombre, @pLibreGluten, @pImporte, @pDescripcion)');
    return results.recordset;
}
export const update = async (pizza, id) => {
    const conn      = await sql.connect(configDB);
    const results   = await conn.request().input('pId', sql.Int, id).input('pNombre', sql.VarChar, pizza.Nombre).input('pLibreGluten', sql.Bit, pizza.LibreGluten).input('pImporte', sql.Float, pizza.Importe).input('pDescripcion', sql.VarChar, pizza.Descripcion).query('UPDATE Pizzas SET Nombre=@pNombre, LibreGluten=@pLibreGluten, Importe=@pImporte, Descripcion=@pDescripcion WHERE Id=@pId');
    return results.recordset;
}
export const deleteById = async (id) => {
    const conn      = await sql.connect(configDB);
    const results   = await conn.request().input('pId', sql.Int, id).query('DELETE FROM Pizzas where Id = @pId');
    return results.recordset;
}*/