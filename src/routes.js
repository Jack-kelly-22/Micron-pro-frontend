/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import TableList from "views/Tables.js";
import NewJob from "views/NewJob.js";
import UserPage from "views/User.js";
import SettingsPage from "views/SettingsPage.js";
import PrevJobsPage from "views/PrevJobsPage.js";
import Login from "views/Login.js";
import { defaults } from "chart.js";
import {is_logged_in,get_user} from "functions/LocalStorageHelper.js";

var routes = [

  {
    path: "/login",
    name: is_logged_in()?get_user().user_name:"Login",
    icon: "nc-icon nc-circle-10",
    component: Login,
    layout: "/admin",
  },
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
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin",
  },
  
  
];
export default routes;
