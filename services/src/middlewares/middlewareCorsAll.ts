import cors from 'cors';

export const middlewareCorsAll = cors({ origin: '*', optionsSuccessStatus: 200 });
