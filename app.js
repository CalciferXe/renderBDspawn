// src/app.js

import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './src/routes/userRoutes.js';
import { config } from 'dotenv';

// Cargar variables de entorno
config();

const app = express();

// Middleware
app.use(bodyParser.json()); // Para parsear JSON en las peticiones

// Rutas
app.use('/api/users', userRoutes); // Define las rutas de los usuarios

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Configuración del puerto
const PORT = process.env.PORT || 3001; // Obtén el puerto desde el archivo .env o usa 3001 por defecto
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
