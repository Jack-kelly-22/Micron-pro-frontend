import { React, useState, useEffect } from "react";

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
import JobList from "components/custom/JobList.js";
import {get_user,is_logged_in} from "../functions/LocalStorageHelper.js";
import Login from "./Login.js";

function PrevJobsPage() {
  //Job info
  const [in_progress_jobs, setInProgressJobs] = useState([]);
  const [completed_jobs, setCompletedJobs] = useState([]);
  const [to_review_jobs, setToReviewJobs] = useState([]);
  const [logged_in, setLoggedIn] = useState(is_logged_in());
  //image options

  useEffect(() => {
    async function get_jobs(data,setter){
      let token = sessionStorage.getItem("access_token");
      let head = { headers: { Authorization: "Bearer " + token } };
      axios.post(process.env.REACT_APP_BACKEND_URL + '/get_jobs',data,head)
      .then(response => {
        setInProgressJobs(response.data.jobs);
        console.log(response.data.jobs);
      })
      .catch(error => {console.log(error);});
    }
    
    var in_progress_data = {status: "In Progress"};
    var completed_data = {status: "Completed"};
    var to_review_data = {status: "to_review"};
    if (logged_in){
      get_jobs(in_progress_data,setInProgressJobs);
      get_jobs(completed_data,setCompletedJobs);
      get_jobs(to_review_data,setToReviewJobs);
    }
  }
  ,[]);
  
  return (
    
      <div className="content">
        <Row>
          <Col md={6}>
            <JobList header="Complete"/>
          </Col>
          {/* <Col md={6}>
            <JobList header="Flagged"/>
          </Col> */}
        </Row>
      </div>
  );

}

export default PrevJobsPage;
