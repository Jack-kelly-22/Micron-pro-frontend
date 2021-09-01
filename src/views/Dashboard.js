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
import {React,useEffect,useState} from "react";
// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";
// core components

import axios from "axios";
import JobList from "../components/custom/JobList.js";
import {get_user,is_logged_in} from "../functions/LocalStorageHelper.js";
import Login from "./Login.js";

function Dashboard() {
  const [stats, setStats] = useState({
    total_images: 0,
    total_jobs: 0,
    in_progress: 0,
  });
  const [logged_in, setLoggedIn] = useState(is_logged_in());

  useEffect(() => {
    async function loadStats() {
      let token = sessionStorage.getItem("access_token");
      let head = { headers: { Authorization: "Bearer " + token } };
      const response = await axios.post(process.env.REACT_APP_BACKEND_URL + "/get_stats",{},head);
      setStats(response.data.stats);
      console.log(response.data.stats);
    }
    loadStats();
  }, []);

  if (!logged_in){
    return <Login setLoggedIn={setLoggedIn} />;
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats bg-dark">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart-bar-32 text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">images processed</p>
                      <CardTitle className="text-light">{stats.total_images}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats bg-dark">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-refresh-69 text-success" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">In-progress Jobs</p>
                      <CardTitle className="text-light">{stats.in_progress}</CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats bg-dark">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Images to be reviewed</p>
                      <CardTitle className="text-light">{stats.review_image_count}</CardTitle>
                      <p />
                      
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats bg-dark" >
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-world-2 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Workers online</p>
                      <p className="card-category text-light">{stats.workers_online}</p>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle>Jobs Overview</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col>
                  <JobList header="In Progress"/>
                  <JobList header="Complete"/>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <iframe src="https://onedrive.live.com/embed?cid=228116ED5800435C&resid=228116ED5800435C%21116&authkey=ANGJOybguZ9peKs" width="165" height="128" frameborder="0" scrolling="no"></iframe>

      </div>
    </>
  );
}

export default Dashboard;

