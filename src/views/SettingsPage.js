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
import { Link } from "react-router-dom";

import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import JobOptions from "../components/custom/JobOptions.js";
import classnames from "classnames";
import { get_users } from "../functions/helper.js";
function SettingsPage() {
  const [activeTab, setActiveTab] = useState("1");
  const [users, setUsers] = useState([]);
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useEffect(() => {
    get_users().then((data) => {
      setUsers(data);
    });
  }, []);

  return (
    <div className="content">
      <Nav tabs>
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
            className={classnames({ active: activeTab === "3" })}
            onClick={() => {
              toggle("3");
            }}
          >
            System Info
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="2">
          <h4>Create Configurations</h4>
          <Row>
            <JobOptions type="settings" buttonText="Save Config" />
          </Row>
        </TabPane>
        <TabPane tabId="3">
          <Row>
            <Col>
              <h4>System Info</h4>
              <Row className="ml-auto">
                <strong>Version: </strong>
                <p> v3.0.3</p>
              </Row>
              <h4> Documentation</h4>
              <Row className="ml-auto">
                <strong>General documentation</strong>
                <a href="https://github.com/Jack-kelly-22/MicronPro/blob/main/micronPro-backend/documentation/micron-pro-spec.docx">
                  product spec
                </a>
              </Row>
              <Row className="ml-auto">
                <strong> Install documentation</strong>
                <a href="https://github.com/Jack-kelly-22/micronPro-worker/blob/master/readme.md">Readme.md</a>
              </Row>
            </Col>
            <Col>
              <h4>Deployment resources</h4>
              <Row>
                <a href="https://dashboard.heroku.com/login">
                  Heroku(frontend)
                </a>
              </Row>
              <Row>
                <a href="https://dashboard.heroku.com/login">Heroku(backend)</a>

              </Row>
              <Row>
                <a href="https://www.mongodb.com/">MongoDB</a>
              </Row>
              <h4>Version Control</h4>
              <Row>
                <a href="https://github.com/Jack-kelly-22/micronPro-worker">
                  micronPro-worker
                </a>
              </Row>
              <Row>
                <a href="https://github.com/Jack-kelly-22/micronPro-frontend">
                  micronPro-frontend
                </a>
              </Row>
              <Row>
                <a href="https://github.com/Jack-kelly-22/MicronPro">
                  micronPro-backend
                </a>
              </Row>
            </Col>
          </Row>
        </TabPane>
      </TabContent>
    </div>
  );
}

export default SettingsPage;
