import { SliceApiPersistentState } from "./api";
import { User } from "./auth";
import { Shopping } from "./shopping";

export interface ReduxState {
  useAuth: SliceApiPersistentState<User>;
  useCart: SliceApiPersistentState<Shopping>;
}
