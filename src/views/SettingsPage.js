import { React, useState, useEffect } from "react";

// reactstrap components
import {
  Button,
  Badge,
  Form,
  Input,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import axios from "axios";

import FolderView from "../components/custom/FolderView.js";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import JobOptions from "../components/custom/JobOptions.js";
import classnames from "classnames";
import {get_users} from "../functions/helper.js";
function SettingsPage() {
  const [activeTab, setActiveTab] = useState("1");
  const [users, setUsers] = useState([]);
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    get_users().then(data => {setUsers(data);});
  }, []);

  return (
    <div className="content">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Tab1
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Configurations
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            System Info
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <h4>Users</h4>
          <ListGroup>
            
            {users!==undefined ?users.map(user => (
              <ListGroupItem key={user.id}>
                {user.user_name}
                dfdsaf
              </ListGroupItem>
            )):null }
          </ListGroup>
        </TabPane>
        <TabPane tabId="2">
          <h4>Create Configurations</h4>
          <Row>
            <JobOptions type="settings" buttonText="Save Config" />
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default SettingsPage;
