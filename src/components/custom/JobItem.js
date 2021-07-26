import { React, useState, useEffect } from "react";
import { ReactDOM } from "react-dom";
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Collapse,
  Badge,
  Row,
  Col,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import axios from "axios";
import {review_images, flag_job} from '../../functions/helper.js';
import "./JobItem.css";


export default function JobItem(job) {
  // reurns div formatted as a job item
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle2 = () => setDropdownOpen2((prevState) => !prevState);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [reviewed_images, setReview_images] = useState([]);
  return (
    <div style={{ marginBottom: "50px" }}>
      <Row>
        <h6 className="pr-2">{job.job_name} </h6>
        <Badge
          pill
          color={job.status === "In Progress" ? "warning" : "success"}
        >
          {job.status}
        </Badge>
        {job.img_review !== undefined ? (
          <Badge pill color="secondary">
            {job.img_review.length} Images to Review
          </Badge>
        ) : null}
      </Row>
      <Row className="jobItem">
        <strong># Images</strong>
        <p className="pr-4">&ensp; {job.num_images}</p>
        <strong>Pores Inspected</strong>
        <p className="pr-4">&ensp; {job.num_pores}</p>
        <strong>Largest Diameter</strong>
        <p className="pr-4">&ensp; {job.largest_pore}</p>
        <strong>Avg porosity</strong>
        <p className="pr-4">
          &ensp; {() => Object.toString(job.avg_pore).slice(0, 4)}
        </p>
        <strong>Worker </strong>
        <p className="pr-4">&ensp; {job.worker_name}</p>
      </Row>
      <Collapse isOpen={dropdownOpen}>
        <Row>
          <strong>
            {job.img_review !== undefined ? job.img_review.length : 0} Images To
            Review
          </strong>
          <strong className="pl-4">Fail Reason</strong>
          <strong className="pl-4">Porosity</strong>
          <strong className="pl-4"># Failed Pores</strong>
        </Row>
        <Row>
          <Col>
            {job.img_review !== undefined
              ? job.img_review.map((img, i) => (
                  <Row className="bg-light">
                    <p className="pl-2 pr-4 pt-3">{img.img_name}</p>
                    <p className="pl-2 pr-4 pt-3">{Math.round(img.porosity*1000)/10}</p>
                    <p className="pr-4 pt-3">{img.fail_reason.slice(0, 1)}</p>
                    <p className="pr-2 pt-3">{img.num_violated}</p>
                    {/* button adds image to reviewed_images  */}
                    <Button
                      color={
                        reviewed_images.includes(img.img_name)
                          ? "success"
                          : "info"
                      }
                      onClick={() =>
                        setReview_images((prevState) => [
                          ...new Set([...prevState, img.img_name]),
                        ])
                      }
                    >
                      {reviewed_images.includes(img.img_name)
                        ? "Reviewed"
                        : "Mark Reviewed"}
                    </Button>
                  </Row>
                ))
              : null}
          </Col>
        </Row>
      </Collapse>
      <Row>Reviewed Images: {reviewed_images.toString()}</Row>

      <Row>
        <Button size="sm" color="secondary" onClick={() => job.view_job(job)}>
          Spreadsheet
        </Button>
        <Button size="sm" color="warning" onClick={toggle}>
          Review Images
        </Button>
        <ButtonDropdown id="dropdown2" isOpen={dropdownOpen2} toggle={toggle2}>
          <DropdownToggle caret>Update status</DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Set All images to Reviewed</DropdownItem>
            <DropdownItem onClick={()=>review_images(job.job_id,reviewed_images, "pass")}>
              >Update Reviewed Images</DropdownItem>
            <DropdownItem
            onClick={() => flag_job(job.job_id)}
            >Flag Job</DropdownItem>
          </DropdownMenu>
        </ButtonDropdown>
        <Button size="sm" color="danger" onClick={() => job.delete_job(job)}>
          Delete Job
        </Button>
      </Row>
    </div>
  );
}

// export default JobItem;
