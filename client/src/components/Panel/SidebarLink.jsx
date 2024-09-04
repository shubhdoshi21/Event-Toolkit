import React from "react";
import * as Icons from "react-icons/vsc";
import { matchPath, NavLink, useLocation } from "react-router-dom";

const SidebarLink = ({ link, iconName }) => {
  const Icon = Icons[iconName] || Icons.VscQuestion;
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <div>
      <NavLink
        to={link.path}
        className={`relative flex items-center p-4 text-sm font-medium ${
          matchRoute(link.path) ? "bg-gray-400/30 w-full" : "bg-opacity-0"
        }`}
      >
        <span
          className={`absolute w-1 h-full left-0 ${
            matchRoute(link.path) ? "bg-lightGray" : "bg-opacity-0"
          }`}
        />

        <div className="flex items-center gap-x-2">
          <Icon className="text-lg" />
          <span className="text-md">{link.name}</span>
        </div>
      </NavLink>
    </div>
  );
};

export default SidebarLink;
