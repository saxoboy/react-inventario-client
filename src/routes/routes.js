// Layouts
import LayoutBasic from "../layouts/Layout";

// Pages
import Dashboard from "../pages/Dashboard";
import User from "../pages/User";
import Error404 from "../pages/404";

const routes = [
  {
    path: "/",
    layout: LayoutBasic,
    component: Dashboard,
    exact: true,
  },
  {
    path: "/user/:username",
    layout: LayoutBasic,
    component: User,
    exact: true,
  },
  {
    layout: LayoutBasic,
    component: Error404,
  },
];

export default routes;