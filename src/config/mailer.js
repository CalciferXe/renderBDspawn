import nodemailer from 'nodemailer';  // Usar import en lugar de require
import dotenv from 'dotenv';  // Usar import para dotenv

dotenv.config();  // Cargar variables de entorno

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NOTIFICATIONS_SERVICE_USER, // Configura esto en .env
    pass: process.env.NOTIFICATIONS_SERVICE_PW, // Configura esto en .env
  },
});

// Verificación de la conexión
transporter.verify(function (error, success) {
  if (error) {
    console.error('Error al verificar el transportador:', error);
  } else {
    console.log('Transportador listo para enviar correos');
  }
});

export { transporter };  // Usar export para exponer el transporter
