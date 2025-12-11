import { axiosFetch, getAccessToken, getApiPersisteState } from "@/utils/api";
import { User } from "@/types/auth";
import { ReduxState } from "@/types/redux";
import { makerStore } from "./makeStore";
import { useGetOwnUser } from "@/api/user/useGetOwnUser";
import { PageContextServer } from "@/types/ssr";

export const getInitialStore = async (args: {
  pageContext: PageContextServer;
}) => {
  const { pageContext } = args; //TODO
  const accessToken = await getAccessToken();

  const initialReduxState: Partial<ReduxState> = {};

  if (accessToken) {
    /**
     * //////////////////////////////////////////////////////////////////////////////
     * //////////////////////////////////////////////////////////////////////////////
     * //////////////////////////////////////////////////////////////////////////////
     */

    const { data: user } = await axiosFetch(
      useGetOwnUser.fetchFnCallArgsGetter()
    );

    initialReduxState.useAuth = getApiPersisteState<User>(user);
  }

  /**
   * //////////////////////////////////////////////////////////////////////////////
   * //////////////////////////////////////////////////////////////////////////////
   * //////////////////////////////////////////////////////////////////////////////
   */

  return makerStore(initialReduxState);
};
