import {React, useState} from "react";

// reactstrap components
import {
    Button,
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
  } from "reactstrap";
  import axios from "axios";

  function FolderView(){

    const [worker_folders, setWorkerFolders] = useState([]);

    function get_folders(){
        axios
        .post(process.env.BACKEND_URL + "/worker_folders", job, head)
        .then((result) => {
          if (result) {
            console.log("finished updating user", result);
            if (result.status === 200) {
              setErrMsg("Job has started... refresh page to start another")
            } else {
              setErrMsg(result.data["msg"]);
            }
          }
        } 
    }

      return(
        <div className="content">
        <Row>
          <Col className="ml-auto mr-auto" md="6">
          <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Image Folders</CardTitle>
              </CardHeader>
              <CardBody>
                  
                
                </CardBody>

                </Card>
                </Col>
                </Row>

      </div>);
  }

export default FolderView;