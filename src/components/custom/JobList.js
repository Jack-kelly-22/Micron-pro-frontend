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
            
            axios.post("http://127.0.0.1:8000"+"/get_jobs").then(function(response) {
                data['jobs'] = response.data;
                setJobList(data['jobs']);
                console.log("JOB LIST: ", data);
            }).catch(function(error) {
                console.log("Error: ", error);
            });
        }
        get_jobs();
    }, []);
    
    return (
        <div>
            <Card> 
                <CardHeader>
                    <CardTitle>
                        <h4>{props.header}</h4>
                    </CardTitle>
                </CardHeader>
                <CardBody>
                    <ListGroup>
                        {job_list.map((job) => {
                            return (
                                <ListGroupItem key={job.id}>
                                    <ListGroupItemHeading>
                                        <h4>{job.name}</h4>
                                    </ListGroupItemHeading>
                                    <ListGroupItemText>
                                        <p>{job.description}</p>
                                    </ListGroupItemText>
                                </ListGroupItem>
                            );
                        }
                        )}
                    </ListGroup>
                </CardBody>
            </Card>
        </div>
    ); 
}
export default JobList;
