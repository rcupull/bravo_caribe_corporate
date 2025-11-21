import { localStorageUtils } from "@/features/local-storage";
import { User } from "@/types/auth";

export const resetPersistentAuthData = () => {
  const { removeLS } = localStorageUtils();

  removeLS("accessToken");
  removeLS("accessTokenUpdatedAt");
  removeLS("refreshToken");
  removeLS("user");
  removeLS("steat");
};

export const setPersistentAuthData = ({
  accessToken,
  refreshToken,
  steat,
  user,
}: {
  accessToken?: string;
  refreshToken?: string;
  user?: User;
  steat?: number;
}) => {
  const { saveLS } = localStorageUtils();

  if (accessToken) {
    saveLS("accessToken", accessToken);
    saveLS("accessTokenUpdatedAt", new Date().toISOString());
  }

  if (refreshToken) {
    saveLS("refreshToken", refreshToken);
  }

  if (steat) {
    saveLS("steat", steat);
  }

  if (user) {
    saveLS("user", user);
  }
};

export const getPersistentAuthData = async () => {
  const { readLS } = localStorageUtils();

  const [accessToken, accessTokenUpdatedAt, refreshToken, steat, user] =
    await Promise.all([
      readLS<string>("accessToken"),
      readLS<string>("accessTokenUpdatedAt"),
      readLS<string>("refreshToken"),
      readLS<number>("steat"),
      readLS<User>("user"),
    ]);

  return {
    accessToken,
    accessTokenUpdatedAt,
    refreshToken,
    steat,
    user,
  };
};
