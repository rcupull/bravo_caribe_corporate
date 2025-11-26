import { SliceApiPersistentState } from "./api";
import { User } from "./auth";
import { CartItem } from "./cart";

export interface ReduxState {
  useAuth: SliceApiPersistentState<User>;
  useCart: Array<CartItem>;
}
