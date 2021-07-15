import { React, useState,useEffect } from "react";
import {ReactDOM,Link} from 'react-dom';
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


function JobItem(job){
    // reurns div formatted as a job item
    return(
        <div>
            <Card>
                <CardHeader>
                    <CardTitle tag="h6">{job.job_name}{" "}
                    <Badge color={job.status==="in_progress"?"info":"success"}>
                        {job.status}</Badge>
                        </CardTitle>
                </CardHeader>
                <CardBody>
                    {/* <Col> */}
                    <Row>
                        <Col md="2">
                            <strong># Images</strong>
                            <p>&ensp; {job.num_images}</p>
                            <strong>Pores Inspected</strong>
                            <p>&ensp; {job.num_pores}</p>
                            <strong>Largest Diameter</strong>
                            <p>&ensp; {job.largest_pore}</p>
                            <strong>Avg porosity</strong>
                            <p>&ensp; {job.avg_pore}</p>
                        </Col>
                        
                        <Col>
                        <strong> Images to Review</strong>
                        <p>&ensp; {job.avg_pore}</p>
                            
                        </Col>
                        
                    
                    
                    </Row>
                    <Row>
                        
                        <Button>
                            
                        </Button>
                        
                    </Row>
                    {/* </Col> */}
                </CardBody>
                </Card>
        </div>
    )
}

export default JobItem;