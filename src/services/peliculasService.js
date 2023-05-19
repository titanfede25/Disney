import sql from 'mssql';
import configDB from '../models/db.js';

export const getAllMovies = async () => {
    const conn      = await sql.connect(configDB);
    const results   = await conn.request().query('SELECT IDPelicula, Imagen, Titulo, FechaCreacion from Peliculas');
    return results.recordset; 
}
export const getDetailedMovie = async (id) => {
    const conn      = await sql.connect(configDB);
    const results1  = await conn.request().input('pId', sql.Int, id).query('select * from Peliculas where IDPelicula = @pId;'); 
    const results2  = await conn.request().input('pId', sql.Int, id).query('select Personajes.* from Personajes inner join Conexiones on Personajes.IDPersonaje = Conexiones.IDPersonaje inner join Peliculas on Conexiones.IDPelicula = Peliculas.IDPelicula where Peliculas.IDPelicula = @pId;');
    results1.recordset[0].Personajes= results2.recordset;
    return results1.recordset[0]; 
}
export const createMovie = async (movie) => {
    const conn      = await sql.connect(configDB);
    const results   = await conn.request().input('pImagen', sql.VarChar, movie.Imagen).input('pTitulo', sql.VarChar, movie.Titulo).input('pFechaCreacion', sql.Date, movie.FechaCreacion).input('pCalificacion', sql.Float, movie.Calificacion).query('INSERT INTO Peliculas (Imagen, Titulo, FechaCreacion, Calificacion) VALUES (@pImagen, @pTitulo, @pFechaCreacion, @pCalificacion)');
    return results.rowsAffected;
}

export const updateMovie = async (movie, id) => {
    const conn      = await sql.connect(configDB);
    const results   = await conn.request().input('pId', sql.Int, id).input('pimagen', sql.VarChar, movie.Imagen).input('pTitulo', sql.VarChar, movie.Titulo).input('pFechaCreacion', sql.Date, movie.FechaCreacion).input('pCalificacion', sql.Float, movie.Calificacion).query('UPDATE Peliculas SET Titulo=@pTitulo, Imagen=@pImagen, FechaCreacion=@pFechaCreacion, Calificacion=@pCalificacion WHERE IDPelicula=@pId');
    return results.rowsAffected;
}

export const deleteMovie = async (id) => {
    const conn      = await sql.connect(configDB);
    const results1   = await conn.request().input('pId', sql.Int, id).query('DELETE FROM Conexiones where IDPelicula = @pId');
    const results2   = await conn.request().input('pId', sql.Int, id).query('DELETE FROM Peliculas where IDPelicula = @pId');
    return results1.recordset;
}
