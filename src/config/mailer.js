const nodemailer = require('nodemailer');
require('dotenv').config(); // Cargar las variables de entorno

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.NOTIFICATIONS_SERVICE_USER, // Configura esto en .env
    pass: process.env.NOTIFICATIONS_SERVICE_PW, // Configura esto en .env
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.error('Error al verificar el transportador:', error);
  } else {
    console.log('Transportador listo para enviar correos');
  }
});

module.exports = { transporter };  // Exportar el transporter
