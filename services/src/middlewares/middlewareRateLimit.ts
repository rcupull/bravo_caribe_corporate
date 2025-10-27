import { addMinutes, differenceInMinutes, isBefore } from 'date-fns';
import { Logger } from 'winston';
import { Request } from 'express';
import { RequestHandler } from '../types/general';

const suspiciousPaths = [
  '/.env',
  '/config.php',
  '/.git',
  '/.git/config',
  '/.gitignore',
  '/.htaccess',
  '/.DS_Store',
  '/backup',
  '/backups',
  '/db',
  '/db.sql',
  '/database.sql',
  '/old',
  '/test',
  '/setup.php',
  '/install.php',
  '/shell.php',
  '/cmd.php',
  '/webdav',
  '/webdav/',
  '/cgi-bin/',
  '/server-status',
  '/api/jsonws',
  '/vendor/phpunit',
  '/solr/admin',
  '/Telerik.Web.UI.WebResource.axd',
  '/console',
  '/cgi-bin/php',
  '/cgi-bin/php5',
  '/cgi-bin/php7'
];

interface Entry {
  attempts: Array<Date>;
  cooldownUntil: Date | null;
}

interface FactoryArgs {
  maxAttempts: number;
  windowMinutes: number;
  waitMinutes: number;
  /**
   * @param req
   * @returns
   */
  handleCallback?: (req: Request) => void | Promise<void>;
  logger: Logger;
  RATE_LIMIT_DISABLED: string;
  RATE_LIMIT_EXCLUDED_IPS: string;
}

type Factory = (args: FactoryArgs) => RequestHandler;

class RateLimit {
  attemptsMap = new Map<string, Entry>();

  constructor(private readonly args: FactoryArgs) {}

  getCanNext = (data: {
    ip: string;
    toPath?: string;
  }): {
    canNext: boolean;
  } => {
    const { ip, toPath } = data;

    const { maxAttempts, waitMinutes, windowMinutes, logger } = this.args;

    const justNow = new Date();

    const entry = (() => {
      let out: Entry | undefined = undefined;

      if (ip) {
        out = this.attemptsMap.get(ip);
      }

      if (!out) {
        out = {
          attempts: [],
          cooldownUntil: null
        };
      }

      return out;
    })();

    /**
     * //////////////////////////////////////////////////////////////////////////////////////////////////////
     * //////////////////////////////////////////////////////////////////////////////////////////////////////
     * //////////////////////////////////////////////////////////////////////////////////////////////////////
     */

    if (entry.cooldownUntil && isBefore(justNow, entry.cooldownUntil)) {
      return {
        canNext: false
      };
    }

    /**
     * //////////////////////////////////////////////////////////////////////////////////////////////////////
     * //////////////////////////////////////////////////////////////////////////////////////////////////////
     * //////////////////////////////////////////////////////////////////////////////////////////////////////
     */

    if (suspiciousPaths.some((path) => toPath?.startsWith(path))) {
      logger.info(`Suspicious path access attempt: ${toPath} from IP: ${ip}`);

      entry.cooldownUntil = addMinutes(justNow, waitMinutes);
      this.attemptsMap.set(ip, entry);

      return {
        canNext: false
      };
    }

    /**
     * //////////////////////////////////////////////////////////////////////////////////////////////////////
     * //////////////////////////////////////////////////////////////////////////////////////////////////////
     * //////////////////////////////////////////////////////////////////////////////////////////////////////
     */
    entry.attempts = entry.attempts.filter(
      (ts) => differenceInMinutes(justNow, ts) < windowMinutes
    );
    entry.attempts.push(justNow);

    if (entry.attempts.length > maxAttempts) {
      entry.cooldownUntil = addMinutes(justNow, waitMinutes);
      this.attemptsMap.set(ip, entry);

      return {
        canNext: false
      };
    }

    /**
     * //////////////////////////////////////////////////////////////////////////////////////////////////////
     * //////////////////////////////////////////////////////////////////////////////////////////////////////
     * //////////////////////////////////////////////////////////////////////////////////////////////////////
     */

    this.attemptsMap.set(ip, entry);
    return {
      canNext: true
    };
  };
}

export const middlewareRateLimit: Factory = (args) => {
  const { handleCallback, logger, RATE_LIMIT_DISABLED, RATE_LIMIT_EXCLUDED_IPS } = args;

  const rateLimit = new RateLimit(args);

  return async (req, res, next) => {
    if (process.env.NODE_ENV === 'test') return next();

    const ip = req.ip;
    const origin = req.headers.origin;
    const browserFingerprint = req.browserFingerprint;
    const method = req.method;
    const toPath = req.originalUrl;

    if (!ip) {
      return next();
    }

    if (RATE_LIMIT_DISABLED === 'true') {
      return next();
    }

    if (
      (RATE_LIMIT_EXCLUDED_IPS || '')
        .split(',')
        .map((ip) => ip.trim())
        .includes(ip)
    ) {
      return next();
    }

    const { canNext } = rateLimit.getCanNext({ ip, toPath });
    if (canNext) return next();

    logger.warn(`Rate limit:============================================================>`);
    logger.warn(`${ip} / ${browserFingerprint}`);
    logger.warn(`origin: ${origin}`);
    logger.warn(`method: ${method}`);
    logger.warn(`to path: ${toPath}`);

    await handleCallback?.(req);
    return res.status(429).send('Too many requests - wait before trying again.');
  };
};
