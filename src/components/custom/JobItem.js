import { React, useState, useEffect } from "react";
import { ReactDOM} from "react-dom";
import {Link} from "react-router-dom";
// reactstrap components
import { Button,Collapse, Badge, Row, Col,ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import axios from "axios";
import "./JobItem.css";
export default function JobItem(job) {
    // reurns div formatted as a job item
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle2 = () => setDropdownOpen2(prevState => !prevState);
    const [dropdownOpen2, setDropdownOpen2] = useState(false);
    const [reviewed_images, setReview_images] = useState([]);
    return (
        <div style={{marginBottom:'50px'}}>
      <Row>
        <h6 className="pr-2">{job.job_name} </h6>
        <Badge pill color={job.status === "In Progress" ? "warning" : "success"}>
          {job.status}
        </Badge>
        {job.img_review!==undefined?(
          <Badge pill color="secondary">
            {job.img_review.length} Images to Review
          </Badge>):null}
      </Row>
      <Row className="jobItem">
        <strong># Images</strong>
        <p className="pr-4">&ensp; {job.num_images}</p>
        <strong>Pores Inspected</strong>
        <p className="pr-4">&ensp; {job.num_pores}</p>
        <strong>Largest Diameter</strong>
        <p className="pr-4">&ensp; {job.largest_pore}</p>
        <strong>Avg porosity</strong>
        <p className="pr-4">&ensp; {()=>Object.toString(job.avg_pore).slice(0,4)}</p>
        <strong>Worker </strong>
        <p className="pr-4">&ensp; {job.worker_name}</p>
      </Row>
          <Collapse isOpen={dropdownOpen}>
      <Row>
        <strong>{job.img_review!==undefined?job.img_review.length:0} Images To Review</strong>
        <strong className="pl-4">Fail Reason</strong>
        <strong className="pl-4">Porosity</strong>
        <strong className="pl-4"># Failed Pores</strong>
      </Row>
      <Row>
        <Col>
        <p className="pr-4">&ensp; </p>
        {job.img_review!==undefined?job.img_review.map((img, i) => (
          <div>
            <Row>
              <p className="pr-4">{img.img_name}</p>
              <p className="pr-4">{img.fail_reason.slice(0,1)}</p>
              <p className="pr-4">{img.num_violated}</p>              
              
              <Link onClick={console.log("hell")} disabled className="nav-link btn-rotate">
                <i className="nc-icon nc-check-2" style={{outlineStyle:'solid' ,borderRadius:'0px'}}/>
                <p >
                  <span className="d-lg-none d-md-block"
                  >Account</span>
                </p>
                </Link>
            
            </Row>
          </div>)):null}
          </Col>
      </Row>
          </Collapse>
      <Row >
        <Button size='sm' color='secondary' onClick={()=>job.view_job(job)}>
            View
        </Button>
        <Button size='sm' color='warning' onClick={toggle}>
            Review Images
        </Button>
        <ButtonDropdown id="dropdown2" isOpen={dropdownOpen2} toggle={toggle2}>
          <DropdownToggle caret>
            Update status
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem>
              Set All images to Reviewed
            </DropdownItem>
            <DropdownItem>
              Update Reviewed Images
            </DropdownItem>
            <DropdownItem>
              Flag Job
            </DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        <Button size='sm' color='info' onClick={()=>job.update_status(job)}>
            Update Status
        </Button>
        <Button size='sm' color='danger' onClick={()=>job.delete_job(job)}>
            Delete Job
        </Button>

      </Row>

      
    </div>
  );
}

// export default JobItem;
