import { createTransport } from 'nodemailer';
import { logger } from '../logger';
import { GMAIL_APP_PASS, GMAIL_USER } from '../../config';

export class EmailServices {
  private transporter;

  constructor() {
    this.transporter = createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASS
      }
    });
  }

  send = (args: { to: string; subject: string; text: string }) => {
    const { to, subject, text } = args;

    this.transporter.sendMail(
      {
        from: `"No Responder" <${GMAIL_USER}>`,
        to,
        subject,
        text
      },
      (error, info) => {
        if (error) {
          logger.error('Error al enviar el correo:');
          logger.error(JSON.stringify(error, null, 2));
          return;
        }
        logger.info('Mensaje enviado:');
        logger.info(info.messageId);
      }
    );
  };
}
