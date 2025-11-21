import { NODE_ENV, LOGGER_LEVEL, LOGS_DIR } from '../../config';
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const { combine, timestamp, label, printf, colorize } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `[${timestamp}] [${label}] ${level}: ${message}`;
});

export const getLogger = (options: {
  LOGGER_LEVEL: string;
  LOGS_DIR: string;
  NODE_ENV: string;
}) => {
  const { LOGGER_LEVEL, LOGS_DIR, NODE_ENV } = options;

  const level = LOGGER_LEVEL || 'info';

  const consoleTransport = new transports.Console({
    level,
    format: combine(
      colorize(),
      label({ label: NODE_ENV }),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      myFormat
    )
  });

  const devLogger = () => {
    return createLogger({
      level,
      transports: [consoleTransport]
    });
  };

  const productionsLogger = () => {
    return createLogger({
      level,
      transports: [
        consoleTransport,
        new transports.DailyRotateFile({
          filename: `${LOGS_DIR}/%DATE%-info.log`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          format: format.combine(timestamp({ format: 'HH:mm:ss' }), format.json()),
          level: 'info'
        }),
        new transports.DailyRotateFile({
          filename: `${LOGS_DIR}/%DATE%-error.log`,
          datePattern: 'YYYY-MM-DD',
          zippedArchive: true,
          format: format.combine(timestamp({ format: 'HH:mm:ss' }), format.json()),
          level: 'error'
        })
      ]
    });
  };

  if (NODE_ENV === 'production' || NODE_ENV === 'stage') {
    return productionsLogger();
  }

  return devLogger();
};

export const logger = getLogger({
  NODE_ENV,
  LOGGER_LEVEL,
  LOGS_DIR
});
