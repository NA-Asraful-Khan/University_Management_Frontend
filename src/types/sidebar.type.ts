import { ReactNode } from "react";

export type TUserPaths = {
  name: string;
  path?: string;
  element?: ReactNode;
  icon?: ReactNode;
  children?: TUserPaths[];
};

export type TRoute = {
  path: string;
  element: ReactNode;
};

export type TSidebar = {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  children?: TSidebar[];
};
