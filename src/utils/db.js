// src/utils/db.js

import pg from 'pg';
import { config } from 'dotenv';

config(); // Cargar variables del archivo .env

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL, // URL de la base de datos en Render
  //ssl:true //Quitar para deploy
});

export { pool };
