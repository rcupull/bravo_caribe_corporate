import { NODE_ENV } from '../config';

/**
 * TODO this code is incomplete
 */

export const getAccountAppHostName = () => {
  if (NODE_ENV === 'development') {
    return `http://localhost:8080`;
  }

  return `https://www.bravocaribe.com`;
};

export const getValidationCodeRoute = (code: string): string => {
  return `${getAccountAppHostName()}/validar-cuenta/${code}`;
};

export const getForgotPasswordCodeRoute = (code: string): string => {
  return `${getAccountAppHostName()}/recuperar-contrasena/${code}`;
};
