import { createTransport } from 'nodemailer';
import { logger } from '../logger';
import {
  EMAIL_PASSWORD,
  EMAIL_SECURE,
  EMAIL_SMTP_HOST,
  EMAIL_SMTP_PORT,
  EMAIL_USER
} from '../../config';

export class EmailServices {
  private transporter;

  constructor() {
    this.transporter = createTransport({
      //@ts-expect-error ignore
      host: EMAIL_SMTP_HOST,
      port: EMAIL_SMTP_PORT,
      secure: EMAIL_SECURE,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD
      }
    });
  }

  send = (args: { to: string; subject: string; text: string }) => {
    const { to, subject, text } = args;

    this.transporter.sendMail(
      {
        from: `"No Responder" <${EMAIL_USER}>`,
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
