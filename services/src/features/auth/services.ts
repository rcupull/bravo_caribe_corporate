import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';
import passportJWT from 'passport-jwt';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { AuthSessionServices } from '../auth-session/services';
import { logger } from '../logger';
import { UserServices } from '../user/services';

import { SECRET_ACCESS_TOKEN, SECRET_REFRESH_TOKEN } from '../../config';
import { QueryHandle } from '../../types/general';
import { AuthSession } from '../../types/auth-session';
import { AuthenticateCallback } from '../../types/auth';
import { User } from '../../types/user';
import { ValidationCodeServices } from '../validation-code/services';

const { Strategy: JWTStrategy, ExtractJwt } = passportJWT;

export class AuthServices {
  steat: number = 300;
  constructor(
    private readonly authSessionServices: AuthSessionServices,
    private readonly userServices: UserServices,
    private readonly validationCodeServices: ValidationCodeServices
  ) {
    this.init();
  }

  private init = () => {
    passport.use(
      new LocalStrategy(async (username: string, password: string, done) => {
        try {
          const user = await this.userServices.getOne({
            query: {
              $or: [{ phone: username }, { email: username }]
            },
            select: {
              password: true
            }
          });

          if (!user) {
            logger.info(`User ${username} not found.`);
            return done(null, false, {
              message: 'Usuario o contraseña incorrectos.'
            });
          }

          const exists = await (async () => {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
              return true;
            } else {
              const validation = await this.validationCodeServices.getValidationCode({
                code: password,
                userId: user._id
              });

              if (validation) {
                await this.validationCodeServices.invalidateValidationCode({
                  validationCodeId: validation._id
                });

                return true;
              }

              return false;
            }
          })();

          if (!exists) {
            logger.info(`Invalid password for user ${username}.`);
            return done(null, false, {
              message: 'Usuario o contraseña incorrectos.'
            });
          }

          if (!user.validated) {
            logger.info(`The user ${username} is not validated`);
            return done(null, false, {
              message: 'El usuario no ha sido validado.'
            });
          }

          logger.info(`User ${user.email} logged in.`);
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      })
    );

    passport.use(
      new JWTStrategy(
        {
          jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
          secretOrKey: SECRET_ACCESS_TOKEN
        },
        async (jwt_payload, done) => {
          const authSession = await this.authSessionServices.getOne({
            query: { userId: jwt_payload.id }
          });

          if (!authSession) {
            return done(null, false, {
              message:
                'No tiene una sesión abierta en este dispositivo o venció el tiempo de expiración.'
            });
          }

          const user = await this.userServices.getOne({
            query: {
              _id: jwt_payload.id
            }
          });

          if (!user) {
            return done(null, false, {
              message: 'Usuario o contraseña incorrectos.'
            });
          }

          return done(null, user);
        }
      )
    );
  };

  generateAccessJWT = ({ id }: { id: string }): string => {
    return jwt.sign(
      {
        id
      },
      SECRET_ACCESS_TOKEN,
      {
        expiresIn: this.steat
      }
    );
  };

  generateRefreshJWT = ({ id }: { id: string }): string => {
    return jwt.sign(
      {
        id
      },
      SECRET_REFRESH_TOKEN,
      {
        expiresIn: '30d'
      }
    );
  };

  refreshAccessToken: QueryHandle<
    { currentSession: AuthSession; refreshToken: string },
    {
      accessToken: string | null;
    }
  > = async ({ currentSession, refreshToken }) => {
    return new Promise((resolve) => {
      jwt.verify(refreshToken, SECRET_REFRESH_TOKEN, async (err: any, jwt_payload: any) => {
        if (err) {
          logger.error(`Error refreshing token ${err}`);

          /**
           * Cuando falla la verificación del token de refresco, se elimina la sesión
           */
          await this.authSessionServices.close({ refreshToken });

          resolve({
            accessToken: null
          });
        } else {
          await this.authSessionServices.updateOne({
            query: {
              _id: currentSession._id
            },
            update: {
              $push: { refreshHistory: new Date() }
            }
          });

          resolve({
            accessToken: this.generateAccessJWT({ id: jwt_payload.id })
          });
        }
      });
    });
  };

  passportMiddlewareAutenticateLocal = (callback: AuthenticateCallback) => {
    return passport.authenticate(
      'local',
      {
        session: false
      },
      callback
    );
  };

  passportMiddlewareAutenticateJWT = (callback: AuthenticateCallback) => {
    return passport.authenticate(
      'jwt',
      {
        session: false
      },
      callback
    );
  };
  isDeprecatedPassword = async (user: User, newPassword: string) => {
    const userPasswordHistory = await this.userServices.getOne({
      query: {
        _id: user._id
      },
      projection: {
        passwordHistory: 1
      }
    });

    const passwordHistory = userPasswordHistory?.passwordHistory || [];

    const results = await Promise.all(
      passwordHistory.map((password) => bcrypt.compare(newPassword, password.password))
    );
    const passwordWasUsed = results.some((result) => result);

    return passwordWasUsed;
  };
  passportMiddlewareInitialize = passport.initialize();
}
