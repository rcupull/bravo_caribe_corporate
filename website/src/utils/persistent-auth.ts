import { localStorageUtils } from "@/features/local-storage";
import { persistentBackdoor } from "@/features/persistent/Context";
import { User } from "@/types/auth";

export const resetPersistentAuthData = () => {
  const { removePersistent } = persistentBackdoor;

  removePersistent("accessToken");
  removePersistent("accessTokenUpdatedAt");
  removePersistent("refreshToken");
  removePersistent("user");
  removePersistent("steat");
};

export const setPersistentAuthData = ({
  accessToken,
  refreshToken,
  steat,
}: {
  accessToken?: string;
  refreshToken?: string;
  steat?: number;
}) => {
  const { setPersistent } = persistentBackdoor;

  const { saveLS } = localStorageUtils();

  if (accessToken) {
    setPersistent("accessToken", accessToken);
    setPersistent("accessTokenUpdatedAt", new Date().toISOString());
  }

  if (refreshToken) {
    setPersistent("refreshToken", refreshToken);
  }

  if (steat) {
    setPersistent("steat", steat);
  }
};

export const getPersistentAuthData = async () => {
  const { getPersistent } = persistentBackdoor;

  const [accessToken, accessTokenUpdatedAt, refreshToken, steat] =
    await Promise.all([
      getPersistent("accessToken"),
      getPersistent("accessTokenUpdatedAt"),
      getPersistent("refreshToken"),
      getPersistent("steat"),
    ]);

  return {
    accessToken,
    accessTokenUpdatedAt,
    refreshToken,
    steat,
  };
};
