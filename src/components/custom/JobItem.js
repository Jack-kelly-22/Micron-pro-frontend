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
import { review_images, flag_job } from "../../functions/helper.js";
import "./JobItem.css";

export default function JobItem(job) {
  // reurns div formatted as a job item
  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle2 = () => setDropdownOpen2((prevState) => !prevState);
  const [dropdownOpen2, setDropdownOpen2] = useState(false);
  const [reviewed_images, setReview_images] = useState([]);
  return (
    <div className="bg-dark" style={{ marginBottom: "50px", borderRadius: 10 }}>
      <Row className="bg-dark ml-auto mr-auto" stype={{ borderRadius: 10 }}>
        <h6 className=" pr-3 pl-3 pt-1 text-light bg-dark">{job.job_name} </h6>
        <Badge
          pill
          color={
            job.status === "In Progress"
              ? "warning"
              : job.status === "Complete"
              ? "info"
              : "success"
          }
        >
          {job.status}
        </Badge>
        {job.img_review !== undefined ? (
          <Badge pill color="secondary">
            {job.img_review.length} Images to Review
          </Badge>
        ) : null}
      </Row>
      <Row className="jobItem pl-4">
        <strong className="text-light"> # Images</strong>
        <p className="pr-4 text-light">&ensp; {job.num_images}</p>
        <strong className="pr-2 text-light">Pores Inspected</strong>
        <p className="pr-4 text-light">&ensp; {job.num_pores}</p>
        <strong className="pr-2 text-light">Largest Diameter</strong>
        <p className="pr-4 text-light">&ensp; {job.largest_pore}</p>
        <strong className="text-light">Avg porosity</strong>
        <p className="pr-4 text-light">
          {() => Object.toString(job.avg_pore).slice(0, 4)}
        </p>
        <strong className="text-light">Worker </strong>
        <p className="pr-2 text-light">&ensp; {job.worker_name}</p>
        <Button  className="ml-auto mr-auto text-dark" size="sm" color="warning" onClick={toggle}>
          Review Images
        </Button>
      </Row>
      <Collapse isOpen={dropdownOpen}>
        <Row className="ml-auto">
        <strong className="pl-2 text-light">image</strong>
          <strong className="pl-4 text-light" text-light>
            Porosity
          </strong>
          <strong className="pl-4 text-light">Fail Reason</strong>
          <strong className="pl-4 text-light"># Failed Pores</strong>
          Button>
        </Row>
        <Row className="ml-auto mr-auto">
          <Col>
            {job.img_review !== undefined
              ? job.img_review.map((img, i) => (
                  <Row className="bg-dark">
                    <p className="pl-2 pr-4 pt-3 text-light">{img.img_name}</p>
                    <p className="pl-2 pr-4 pt-3 text-light">
                      {Math.round(img.porosity * 10000) / 100}%
                    </p>
                    <p className="pr-4 pt-3 text-light">
                      {img.fail_reason.slice(0, 1)}
                    </p>
                    <p className="pr-2 pt-3 text-light">{img.num_violated}</p>
                    {/* button adds image to reviewed_images  */}
                    <Button
                      className="ml-auto mr-auto text-dark"
                    size="sm"
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
        <Row className="pl-5">
          <strong className="text-light">
            Reviewed Images: {reviewed_images.toString()}
          </strong>
        </Row>
      </Collapse>

      <Row className="pl-3">
        <Button size="sm" color="secondary" onClick={() => job.view_job(job)}>
          Spreadsheet
        </Button>
        
        <ButtonDropdown id="dropdown2" isOpen={dropdownOpen2} toggle={toggle2}>
          <DropdownToggle caret>Update status</DropdownToggle>
          <DropdownMenu>
            <DropdownItem>Set All images to Reviewed</DropdownItem>
            <DropdownItem
              onClick={() => review_images(job.job_id, reviewed_images, "pass")}
            >
              >Update Reviewed Images
            </DropdownItem>
            <DropdownItem onClick={() => flag_job(job.job_id)}>
              Flag Job
            </DropdownItem>
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
