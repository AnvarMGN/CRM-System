import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from ".";// типизация автоматическая из '/store/index'

export const selectAuth = (state: RootState) => {
  return state.auth;
};

export const selectUserRoles = createSelector(
  selectAuth,
  (auth) => auth.user.roles || []
);

export const selectIsAdminOrModerator = createSelector(
  selectUserRoles,
  (roles) => roles.some((role) => ["ADMIN", "MODERATOR"].includes(role))
);
