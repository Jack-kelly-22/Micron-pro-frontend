import { React, useState, useEffect } from "react";
import ReactDOM from "react-dom";
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
  ListGroupItemText,
  ListGroupItemHeading,
} from "reactstrap";
import axios from "axios";

import JobItem from "./JobItem.js";
// const dotenv = require('dotenv');
// dotenv.config({ path: '.env' });

function JobList(props) {
  const [job_list, setJobList] = useState([]);

  function delete_job(job) {
    // deletes job from view and removes from db and deletes folder on host
    let head = { headers: { Authorization: "Bearer " + sessionStorage.getItem("access_token") } };
    job_list.filter((j) => j.job_id !== job.job_id);
    setJobList(job_list);
    axios.post(process.env.REACT_APP_BACKEND_URL + "/update_job", {
      job_id: job.job_id,
      worker_name: job.worker_name,
      job_name: job.job_name,
      action:"delete",
    },head)

  }

  function update_status(job) {
    // deletes job from view and removes from db and deletes folder on host
    if (job===undefined) {
      
      return;
    }
    job_list.filter((j) => j.job_id !== job.job_id);
    let head = { headers: { Authorization: "Bearer " + sessionStorage.getItem("access_token") } };
    setJobList(job_list);

    if (job.status === "") {
      axios.post(process.env.REACT_APP_BACKEND_URL + "/update_status", {
        job_id: job.job_id,
        worker_name: job.worker_name,
        job_name: job.job_name,
        status: "running",
      },head);
    }
  }



  useEffect(() => {
    async function get_jobs() {
      let data = {};
      if (props.header !== undefined) {
        data["status"] = props.header;
      }
      

      let token = sessionStorage.getItem("access_token");
      let head = { headers: { Authorization: "Bearer " + token } };
      axios
        .post(process.env.REACT_APP_BACKEND_URL + "/get_jobs", data, head)
        .then(function (response) {
          setJobList(response.data.jobs);
          console.log("JOB LIST: ", response.data.jobs);
        })
        .catch(function (error) {
          console.log("Error: ", error);
        });
    }
    get_jobs();
  }, []);

  return (
    <div>
        <h5>{props.header}</h5>
        {job_list.map((job) => {
          return <JobItem {...job}  delete_job={delete_job} update_status={update_status()}/>;
        })}
      {/* </Card> */}
    </div>
  );
}
export default JobList;
