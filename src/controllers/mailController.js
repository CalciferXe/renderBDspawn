import { transporter } from 'src/config/mailer.js';

export const MailController = async (req, res) => {
    const { to, subject, text } = req.body; // Recibe el correo del destinatario, el asunto y el texto

    // HTML con logo y mensaje personalizado
    const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                background-color: #f4f4f4;
                color: #333;
            }
            .email-container {
                max-width: 600px;
                margin: 20px auto;
                background: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: #96ac60;
                color: #fff;
                text-align: center;
                padding: 20px;
            }
            .header img {
                max-width: 150px;
                margin-bottom: 10px;
            }
            .header h1 {
                margin: 0;
                font-size: 24px;
            }
            .content {
                padding: 20px;
            }
            .content p {
                margin: 0 0 15px;
                line-height: 1.6;
            }
            .button-container {
                text-align: center;
                margin: 20px 0;
            }
            .button {
                background: #96ac60;
                color: #ffffff;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 4px;
                font-weight: bold;
            }
            .button:hover {
                background: #45a049;
            }
            .footer {
                background: #f4f4f4;
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #777;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <img src="https://renderbdspawn.onrender.com/image.png" alt="SpawnChatter Logo">
                <h1>SpawnChatter</h1>
            </div>

            <div class="content">
                <p>¡Hola!</p>
                <p>Nos complace informarte que la acción que realizaste en <strong>SpawnChatter</strong> se completó con éxito.</p>
                <p>Si tienes alguna pregunta o necesitas ayuda, no dudes en ponerte en contacto con nuestro equipo de soporte.</p>
                
                <div class="button-container">
                    <a href="localhost:3001" class="button">Visita SpawnChatter</a>
                </div>
            </div>

            <div class="footer">
                Este es un correo automatizado. Por favor, no respondas a este mensaje.<br>
                © 2024 SpawnChatter. Todos los derechos reservados.
            </div>
        </div>
    </body>
    </html>
    `;

    try {
        // Enviar el correo
        await transporter.sendMail({
            from: '"Notificaciones 👌" <appspawnchatter@gmail.com>',
            to,  // Aquí va el correo del destinatario que recibimos en req.body
            subject: subject || 'Servicio de Notificaciones',  // Usamos el asunto enviado o uno por defecto
            text: text,  // Mensaje de texto simple
            html: htmlContent,  // HTML con la estructura que hemos definido
        });

        // Responder exitosamente
        res.status(200).json({ message: 'Correo enviado correctamente' });
    } catch (error) {
        console.error('Error enviando el correo:', error);
        res.status(500).json({ message: 'Error al enviar el correo', error });
    }
};
