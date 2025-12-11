"use client";

import { createContext } from "react";

import { PersistentUtils } from "./types";

export const initialPersistentState: PersistentUtils = {
  setPersistent: async () => {
    console.log("calling default setPersistent");
    /**NOP */
  },
  getPersistent: async () => {
    console.log("calling default getPersistent");
    /**NOP */
  },
  removePersistent: async () => {
    console.log("calling default removePersistent");
    /**NOP */
  },
};

export const persistentBackdoor: PersistentUtils = initialPersistentState;

export const PersistentContext = createContext<PersistentUtils>(
  initialPersistentState
);
