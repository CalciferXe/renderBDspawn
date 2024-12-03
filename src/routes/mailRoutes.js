// src/routes/mailRoutes.js

import express from 'express';
import { MailController } from '../controllers/mailController.js';

const router = express.Router();

//enviarCorreo
router.post('/', MailController); // Ruta para enviar correos


export default router;
