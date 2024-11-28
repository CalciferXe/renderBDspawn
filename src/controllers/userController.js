// src/controllers/userController.js

import { createUser, getUsers, getUserById, updateUser, deleteUser, getProfilePicture } from '../models/userModel.js';
import multer from 'multer';

// Configuración de Multer para manejar la imagen como buffer
const storage = multer.memoryStorage(); // Utilizamos memoria para almacenar la imagen como buffer
const upload = multer({ storage: storage });

// Crear un usuario con imagen de perfil
export const createUserController = async (req, res) => {
  const { name, email, phone_number, password, nivel, is_authenticated } = req.body;
  const profilePicture = req.file ? req.file.buffer : null; // Convertimos la imagen en buffer binario
  
  try {
    const user = await createUser({ name, email, phone_number, password, nivel, is_authenticated, profile_picture: profilePicture });
    res.status(201).json(user); // Retorna el usuario creado
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener todos los usuarios
export const getUsersController = async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener un usuario por ID
export const getUserByIdController = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un usuario con imagen de perfil
export const updateUserController = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone_number, password, nivel, is_authenticated } = req.body;
  const profilePicture = req.file ? req.file.buffer : null; // Convertimos la imagen en buffer binario

  try {
    const updatedUser = await updateUser(id, { name, email, phone_number, password, nivel, is_authenticated, profile_picture: profilePicture });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un usuario
export const deleteUserController = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await deleteUser(id);
    res.status(200).json(deletedUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener la imagen de perfil de un usuario
export const getProfilePictureController = async (req, res) => {
  const { id } = req.params;
  try {
    const profilePicture = await getProfilePicture(id);
    if (profilePicture) {
      res.set('Content-Type', 'image/jpeg'); // Especificamos el tipo de la imagen, en este caso JPEG
      res.send(profilePicture); // Enviamos la imagen como respuesta
    } else {
      res.status(404).json({ error: 'Imagen de perfil no encontrada' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

