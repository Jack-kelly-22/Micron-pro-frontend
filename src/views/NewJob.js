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
  ListGroupItemText,
} from "reactstrap";
import axios from "axios";

import FolderView from "../components/custom/FolderView.js";
import JobOptions from "../components/custom/JobOptions.js";

const dotenv = require('dotenv');
dotenv.config();

function NewJob() {
  //Job info
  const [job_name, setJobName] = useState("defaultname");
  const [folders, setFolders] = useState([]);
  //image options

  function add_folder(folder, size) {
    folders.push({ name: folder, size: size });
    let new_folders = [...new Set(folders)];
    setFolders(new_folders);
    console.log("new_folders", new_folders);
  }

  function remove_folder(folder) {
    //removes folder from folders array
    let new_folders = folders.filter((f) => f.name != folder);
    setFolders(new_folders);
    console.log("new_folders:", new_folders);
  }

  return (
    <>
      <div className="content">
        <Row>
          <Col className="mr-auto" md="6">
            <h5>Create New Job</h5>
            <JobOptions header="Create New Job" buttonText="Start Job" />
          </Col>
          <Col md="6">
            <FolderView add_folder={add_folder}></FolderView>
            <h5>Selected folders</h5>
            <ListGroup>
              {folders.map(function (folder, i) {
                return (
                  <ListGroupItem key={i} style={{"max-height":'50px'}}>
                    <ListGroupItemText>{folder.name} <Badge pill>{folder.size}</Badge>
                    <Button
                      size="sm"
                      style={{
                        // float: "right",
                        borderRadius: "70px",
                      }}
                      color="danger"
                      onClick={() => remove_folder(folder.name)}
                    >
                      x
                    </Button></ListGroupItemText>
                    
                    
                  </ListGroupItem>
                );
              })}
            </ListGroup>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default NewJob;
