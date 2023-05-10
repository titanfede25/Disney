import sql from 'mssql';
import configDB from '../models/db.js';

export const getAll = async () => {
    const conn      = await sql.connect(configDB);
    const results   = await conn.request().query('SELECT * FROM Pizzas');
    return results.recordset; 
}
export const getById = async (id) => {
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
}