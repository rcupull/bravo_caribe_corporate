import 'dotenv/config';

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 8080;
export const DB_URL = process.env.DB_URL || '';

export const SECRET_ACCESS_TOKEN = process.env.SECRET_ACCESS_TOKEN || '';
export const SECRET_REFRESH_TOKEN = process.env.SECRET_REFRESH_TOKEN || '';

export const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || '';
export const EMAIL_SECURE = process.env.EMAIL_SECURE || '';
export const EMAIL_SMTP_HOST = process.env.EMAIL_SMTP_HOST || '';
export const EMAIL_SMTP_PORT = process.env.EMAIL_SMTP_PORT || '';
export const EMAIL_USER = process.env.EMAIL_USER || '';

export const CORS_WHITE_LIST = process.env.CORS_WHITE_LIST || '';
export const RATE_LIMIT_DISABLED = process.env.RATE_LIMIT_DISABLED || '';
export const RATE_LIMIT_EXCLUDED_IPS = process.env.RATE_LIMIT_EXCLUDED_IPS || '';

export const LOGGER_LEVEL = process.env.LOGGER_LEVEL || '';
export const LOGS_DIR = process.env.LOGS_DIR || '';

export const S3_REGION = process.env.S3_REGION || '';
export const S3_ENDPOINT = process.env.S3_ENDPOINT || '';
export const S3_ACCESS_KEY_ID = process.env.S3_ACCESS_KEY_ID || '';
export const S3_SECRET_ACCESS_KEY = process.env.S3_SECRET_ACCESS_KEY || '';
export const S3_BUCKET_APP = process.env.S3_BUCKET_APP || '';
