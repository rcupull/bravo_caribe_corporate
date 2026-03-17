import { HOSTNAME } from '../config';

export const getValidationCodeRoute = (code: string): string => {
  return `${HOSTNAME}/validar-cuenta/${code}`;
};

export const getForgotPasswordCodeRoute = (code: string): string => {
  return `${HOSTNAME}/recuperar-cuenta/${code}`;
};
