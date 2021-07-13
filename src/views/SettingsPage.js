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
import {React, useState,useEffect} from "react";

// reactstrap components
import {
    Button,
    Badge,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
    ListGroup,
    ListGroupItem,
  } from "reactstrap";
  import axios from "axios";

import FolderView from "../components/custom/FolderView.js"
import JobOptions from "../components/custom/JobOptions.js";
function SettingsPage() {
    
  return (
    <JobOptions type="settings" buttonText="Save Config"/>);
}

export default SettingsPage;
