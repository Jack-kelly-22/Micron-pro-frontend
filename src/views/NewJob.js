/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import {React, useState,useEffect} from "react";

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

import FolderView from "../components/custom/FolderView.js"
// import {JobOptions} from "../components/custom/JobOptions.js"

function NewJob() {
    //Job info
    const [job_name, setJobName] = useState("defaultState");
    const [folders, setFolders] = useState([]);
    //image options
    

    function add_folder(folder,size){
        folders.push({name:folder,size:size});
        let new_folders = [...new Set(folders)];
        setFolders(new_folders);
        console.log("new_folders", new_folders);
    }

    function remove_folder(folder){
      //removes folder from folders array
      let new_folders = folders.filter(f => f.name != folder);
      setFolders(new_folders);
      console.log("new_folders", new_folders);
  }
  


    function post_job(){
        // let job = {
        //     "job_name":job_name,
        //     "Notes":Notes,
        //     "scale":scale,
        //     "thresh_value":thresh_value,
        //     "num_circles":num_circles,
        //     "alt_thres":alt_thres,
        //     "crop_size":crop_size,
        //     "min_pore":min_pore,
        //     "max_pore":max_pore,
        //     "max_diameter":max_diameter,
        //     "ignore_size":ignore_size,

        // }
        console.log("Start job button has been clicked");
      //   let token = sessionStorage.getItem("access_token");
      //   let head = { headers: { Authorization: "Bearer " + token } };
      //   axios
      // .post(process.env.BACKEND_URL + "/new_job", job, head)
      // .then((result) => {
      //   if (result) {
      //     console.log("finished updating user", result);
      //     if (result.status === 200) {
      //       setErrMsg("Job has started... refresh page to start another")
      //     } else {
      //       setErrMsg(result.data["msg"]);
      //     }
      //   }
      // })
      // .catch(function (error) {
      //   console.log("error,", error.response.data.msg);
      //   setErrMsg(error.response.data.msg);
      // });
  }
    
  
  return (
    <>
      <div className="content">
        <Row>
        {/* <JobOptions/> */}
          <Col className="ml-auto mr-auto" md="6">
          <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Create New Job</CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>Job Name(no spaces)</label>
                        <Input
                          placeholder="default-name"
                          onChange={(v) => setJobName(v.target.value)}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Row/>
                  </Row>
                  {/* <JobOptions type="new"/> */}
                  
                  
                  <Row>
                    <Col md="12">
                  
                      <ListGroup>
                      <h5>
                        Added folders
                        {folders.map(function(folder, i){
                          return (
                          <ListGroupItem  key={i} className="justify-content-between">
                            <Row>
                              <Col md="8">
                            {folder.name}
                            <Badge pill>{folder.size}</Badge>
                              </Col>
                              <Col md={"3"}>
                                <Button
                                  size="sm"
                                  style={{ float: "right", borderRadius: "70px" }}
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
                      </h5>

                      </ListGroup>
                    </Col>
                  </Row>
                  <Row>
                    {/* <div className="update ml-auto mr-auto">
                      <Button
                        className="btn-round"
                        color="primary"
                        onClick={()=>post_job()}
                      >
                        Start Job
                      </Button>
                      <h6>{err_msg}</h6>
                    </div> */}
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
          <Col className="ml-auto mr-auto" md="6">
          
            <FolderView add_folder={add_folder}></FolderView>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default NewJob;
