const nodemailer = require('nodemailer');
require('dotenv').config();  // Cargar las variables de entorno desde .env

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // Usar true para puerto 465
  auth: {
    user: process.env.NOTIFICATIONS_SERVICE_USER, // Configura el correo en el archivo .env
    pass: process.env.NOTIFICATIONS_SERVICE_PW, // Configura la contraseña en el archivo .env
  },
});

// Verificar la conexión del transportador
transporter.verify(function (error, success) {
  if (error) {
    console.error('Error al verificar el transportador:', error);
  } else {
    console.log('Transportador listo para enviar correos');
  }
});

module.exports = { transporter }; // Exportamos el transporter para usarlo en otros archivos
