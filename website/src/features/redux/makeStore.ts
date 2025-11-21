import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { AnyRecord } from "@/types/general";
import { slices } from "./slices";

export const makerStore = (preloadedState: Partial<AnyRecord> = {}) => {
  const enhancedReducers = combineReducers({
    ...Object.values(slices).reduce(
      (r, { name, reducer }) => ({ ...r, [name]: reducer }),
      {}
    ),
  });

  const store = configureStore({
    reducer: enhancedReducers,
    preloadedState,
    devTools: true,
    middleware: (getDefaultMiddleware) => {
      //https://stackoverflow.com/questions/61704805/getting-an-error-a-non-serializable-value-was-detected-in-the-state-when-using
      return getDefaultMiddleware({
        serializableCheck: false,
      });
    },
  });

  return { store };
};
