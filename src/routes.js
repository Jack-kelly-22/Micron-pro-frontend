import Dashboard from "views/Dashboard.js";
import NewJob from "views/NewJob.js";
import SettingsPage from "views/SettingsPage.js";
import PrevJobsPage from "views/PrevJobsPage.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  
  {
    path: "/new_job",
    name: "New Job",
    icon: "nc-icon nc-album-2",
    component: NewJob,
    layout: "/admin",
  },
  {
    path: "/prev_jobs",
    name: "Previous Jobs",
    icon: "nc-icon nc-bookmark-2",
    component: PrevJobsPage,
    layout: "/admin",
  },
  {
    path: "/settings",
    name: "Settings ",
    icon: "nc-icon nc-settings-gear-65",
    component: SettingsPage,
    layout: "/admin",
  },
  
];
export default routes;
