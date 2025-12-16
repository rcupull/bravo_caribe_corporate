import { useEffect } from 'react';

import { getBrowserFingerprintFromPersistent, setBrowserFingerprintToPersistent } from './utils';

import { load } from '@fingerprintjs/fingerprintjs';

export const BrowserFingerprint = (): JSX.Element | null => {
  const init = async () => {
    const browserFingerprint = await getBrowserFingerprintFromPersistent();

    if (!browserFingerprint) {
      const fp = await load();
      const result = await fp.get();
      await setBrowserFingerprintToPersistent(result.visitorId);
    }
  };

  useEffect(() => {
    init();
  }, []);

  return null;
};
