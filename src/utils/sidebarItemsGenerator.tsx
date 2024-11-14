import { NavLink } from "react-router-dom";
import { TSidebar, TUserPaths } from "../types";

export const sidebarItemsGenerator = (items: TUserPaths[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebar[], item) => {
    if (item.path && item.name) {
      acc.push({
        key: item.path,
        icon: item.icon,
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children) {
      acc.push({
        key: item.name,
        label: item.name,
        icon: item.icon,
        children:
          item.children?.map((child) => ({
            key: child.path ?? "",
            label: (
              <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
            ),
          })) ?? [],
      });
    }
    return acc;
  }, []);

  return sidebarItems;
};
