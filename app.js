// app.js

import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './src/routes/userRoutes.js';
import mailRoutes from './src/routes/mailRoutes.js';
import { config } from 'dotenv';
import cors from 'cors';  // Importa el paquete cors

// Cargar variables de entorno
config();

const app = express();

// Configurar CORS para aceptar solicitudes desde cualquier origen
const corsOptions = {
  origin: '*', // Permitir solicitudes desde cualquier origen
  methods: ['GET', 'POST'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
};

// Middleware
app.use(cors(corsOptions));  // Aplica la configuración de CORS
app.use(bodyParser.json()); // Para parsear JSON en las peticiones

// Ruta para servir la imagen estática
app.use('/image.png', express.static('src/image.png'));

// Rutas
app.use('/api/users', userRoutes); // Define las rutas de los usuarios

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Rutas para enviar correos
app.use('/api/send-email', mailRoutes);

// Configuración del puerto
const PORT = process.env.PORT || 3001; // Obtén el puerto desde el archivo .env o usa 3001 por defecto
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
