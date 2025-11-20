import { SliceApiPersistentState } from "./api";
import { User } from "./auth";

export interface ReduxState {
  useAuth: SliceApiPersistentState<User>;
}
