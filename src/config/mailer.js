const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true para 465, false para otros puertos
  auth: {
    user: process.env.NOTIFICATIONS_SERVICE_USER, // Asegúrate de configurar esto en tu archivo .env
    pass: process.env.NOTIFICATIONS_SERVICE_PW, // Asegúrate de configurar esto en tu archivo .env
  },
});

// Verificar conexión con el servidor SMTP
transporter.verify(function (error, success) {
  if (error) {
    console.error('Error al verificar el transportador:', error);
  } else {
    console.log('Transportador listo para enviar correos');
  }
});
