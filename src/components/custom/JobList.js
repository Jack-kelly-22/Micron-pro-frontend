import { React, useState,useEffect } from "react";
import ReactDOM from 'react-dom';
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

function JobList(props) {
    const [job_list, setJobList] = useState([]);
    useEffect(() => {
        async function get_jobs(){
            let data = {};
            if (props.header==="In Progress"){
                data['status'] = 'In Progress';
            }
            if (props.header==="Recently Finished"){
                data['status'] = 'finished';
            }
            
            axios.post("http://127.0.0.1:5000"+"/get_jobs",data).then(function(response) {
                
                setJobList(response.data.jobs);
                console.log("JOB LIST: ", response.data.jobs);
            }).catch(function(error) {
                console.log("Error: ", error);
            });
        }
        get_jobs();
    }, []);
    
    return (
        <div>
            <Card body outline color="danger">
                <CardHeader tag="h5">{props.header}</CardHeader>
                    <ListGroup>
                        {job_list.map((job) => {
                            return (
                                <ListGroupItem key={job.job.job_name}>
                                        {job.job.job_name}
                                </ListGroupItem>
                            );
                        }
                        )}
                    </ListGroup>
            </Card>
        </div>
    ); 
}
export default JobList;
