// src/routes/userRoutes.js

import express from 'express';
import { createUserController, getUsersController, getUserByIdController, updateUserController, deleteUserController } from '../controllers/userController.js';

const router = express.Router();

// Obtener todos los usuarios
router.get('/', getUsersController); // Listar todos los usuarios

// Obtener un usuario por ID
router.get('/:id', getUserByIdController); // Obtener un usuario por ID

// Actualizar un usuario por ID
router.put('/:id', updateUserController); // Editar un usuario por ID

// Eliminar un usuario por ID
router.delete('/:id', deleteUserController); // Eliminar un usuario por ID

export default router;
