import { DB_URL } from '../../config';
import { connect } from 'mongoose';
import { logger } from '../logger';

export const connectDB = async () => {
  try {
    await connect(DB_URL);

    logger.info('DB Connected');
  } catch (e) {
    logger.info(`DB Error: ${JSON.stringify(e)}`);
  }
};
