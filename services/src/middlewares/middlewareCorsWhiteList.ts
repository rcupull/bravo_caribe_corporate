import cors from 'cors';
import { Logger } from 'winston';

export const middlewareCorsWhiteList = (args: { CORS_WHITE_LIST: string; logger?: Logger }) => {
  const { CORS_WHITE_LIST, logger } = args;

  return cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (CORS_WHITE_LIST.includes(origin)) {
        return callback(null, true);
      }

      logger?.error(`Origin ${origin} is not allowed by CORS policy`);
      callback(new Error('Not allowed by CORS'));
    },
    optionsSuccessStatus: 200
  });
};
