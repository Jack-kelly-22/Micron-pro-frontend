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

import FolderView from "../components/custom/FolderView.js";
import JobOptions from "../components/custom/JobOptions.js";

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
      <div className="content">
        <Row>
          <Col className="ml-auto mr-auto" md="7">
            <h5>Create New Job</h5>
              <JobOptions header="Create New Job" buttonText="Start Job" />
          </Col>
          <Col className="ml-auto mr-auto" md="5">
                <Form>
                  <Row>
                    <Col md="12">
                      <ListGroup>
                          Added folders
                          {folders.map(function (folder, i) {
                            return (
                              <ListGroupItem
                                key={i}
                                className="justify-content-between"
                              >
                                <Row>
                                  <Col md="8">
                                    {folder.name}
                                    <Badge pill>{folder.size}</Badge>
                                  </Col>
                                  <Col md={"3"}>
                                    <Button
                                      size="sm"
                                      style={{
                                        float: "right",
                                        borderRadius: "70px",
                                      }}
                                      variant="danger"
                                      onClick={() => remove_folder(folder.name)}
                                    >
                                      x
                                    </Button>
                                  </Col>
                                </Row>
                              </ListGroupItem>
                            );
                          })}
                      </ListGroup>
                    </Col>
                  </Row>
                </Form>
          </Col>
          <Col className="ml-auto mr-auto" md="5">
            <FolderView add_folder={add_folder}></FolderView>
          </Col>
        </Row>
      </div>
  );
}

export default NewJob;
