import { createSelector } from "@ngrx/store";
import { AppState } from "./../reducers";
import { AuthState } from "./reducers";

export const isLoggedIn = createSelector(
  (state: AppState) => state["auth"],

  (auth: AuthState): boolean => !!auth.user
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  (loggedIn: boolean): boolean => !loggedIn
);
