import { ReactNode } from "react";

export type TUserPaths = {
  name: string;
  path: string; // Ensure path is required
  element?: ReactNode; // Optional because some routes may not have an element
  icon?: ReactNode; // Optional because some routes may not have an icon
  children?: TUserPaths[]; // Nested children of the same type
};

export type TRoute = {
  path: string; // Ensure path is required
  element?: ReactNode; // Required in TRoute
  children?: TRoute[]; // Nested children of the same type
};

export type TSidebar = {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  children?: TSidebar[] | undefined;
};
