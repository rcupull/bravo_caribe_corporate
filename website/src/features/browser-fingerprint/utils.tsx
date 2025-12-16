import { persistentBackdoor } from "../persistent/Context";

export const browserFingerprintKey = "browserFingerprint";

export const getBrowserFingerprintFromPersistent = async () => {
  const { getPersistent } = persistentBackdoor;

  const out = await getPersistent(browserFingerprintKey);
  return out;
};

export const setBrowserFingerprintToPersistent = async (value: string) => {
  const { setPersistent } = persistentBackdoor;

  await setPersistent(browserFingerprintKey, value);
};
