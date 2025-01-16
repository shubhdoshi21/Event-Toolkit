import { AccountType } from "../utils/constants";
export const sidebarlinks = [
  {
    id: "1",
    name: "My profile",
    path: "/profile",

    icon: "VscAccount",
  },
  {
    id: "2",
    name: "Add Service details",
    path: "/panel/add-services",
    type: AccountType.Vendor,
    icon: "VscAdd",
  },
  {
    id: "3",
    name: "My Services",
    path: "/panel/my-services",
    type: AccountType.Vendor,
    icon: "VscLibrary",
  },
  {
    id: "4",
    name: "Add venues",
    path: "/panel/add-venue",
    type: AccountType.Admin,
    icon: "VscAdd",
  },
  {
    id: "5",
    name: "History",
    path: "/panel/history",
    icon: "VscHistory",
  },
  {
    id: "6",
    name: "Add sub venues",
    path: "/panel/venues",
    type: AccountType.Admin,
    icon: "VscAdd",
  },
  {
    id: "7",
    name: "Add city",
    path: "/panel/add-city",
    type: AccountType.Admin,
    icon: "VscAdd",
  },
];
