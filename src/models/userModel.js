// src/models/userModel.js

import { pool } from '../utils/db.js';

// Crear un nuevo usuario con imagen de perfil
export const createUser = async ({ name, email, phone_number, password, nivel = 1, is_authenticated = true, profile_picture }) => {
  const query = `
    INSERT INTO users (name, email, phone_number, password, nivel, is_authenticated, profile_picture)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *`;
  const values = [name, email, phone_number, password, nivel, is_authenticated, profile_picture];
  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Retorna el usuario creado
  } catch (error) {
    throw new Error('Error al crear el usuario: ' + error.message);
  }
};

// Obtener todos los usuarios
export const getUsers = async () => {
  try {
    const result = await pool.query('SELECT * FROM users');
    return result.rows; // Devuelve todos los usuarios
  } catch (error) {
    throw new Error('Error al obtener los usuarios: ' + error.message);
  }
};

// Obtener un usuario por ID
export const getUserById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0]; // Devuelve el usuario encontrado
  } catch (error) {
    throw new Error('Error al obtener el usuario: ' + error.message);
  }
};

// Actualizar un usuario, incluyendo la imagen de perfil
export const updateUser = async (id, { name, email, phone_number, password, nivel, is_authenticated, profile_picture }) => {
  const query = `
    UPDATE users
    SET name = $1, email = $2, phone_number = $3, password = $4, nivel = $5, is_authenticated = $6, updated_at = CURRENT_TIMESTAMP, profile_picture = $7
    WHERE id = $8
    RETURNING *`;
  const values = [name, email, phone_number, password, nivel, is_authenticated, profile_picture, id];
  try {
    const result = await pool.query(query, values);
    return result.rows[0]; // Retorna el usuario actualizado
  } catch (error) {
    throw new Error('Error al actualizar el usuario: ' + error.message);
  }
};

// Eliminar un usuario
export const deleteUser = async (id) => {
  try {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return result.rows[0]; // Retorna el usuario eliminado
  } catch (error) {
    throw new Error('Error al eliminar el usuario: ' + error.message);
  }
};

// Obtener la imagen de perfil de un usuario por su ID
export const getProfilePicture = async (id) => {
  const query = 'SELECT profile_picture FROM users WHERE id = $1';
  try {
    const result = await pool.query(query, [id]);
    return result.rows[0]?.profile_picture || null; // Devuelve la imagen o null si no existe
  } catch (error) {
    throw new Error('Error al obtener la imagen de perfil: ' + error.message);
  }
};
