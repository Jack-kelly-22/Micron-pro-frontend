import { React, useState,useEffect } from "react";
import { Link } from "react-router-dom";

import ReactDOM from 'react-dom';
// reactstrap components
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardTitle,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  ListGroupItemText,
  ListGroupItemHeading,
} from "reactstrap";
import axios from "axios";




function FolderView(props) {

  const [worker_folders, setWorkerFolders] = useState([]);
  const [err_msg, setErrMsg] = useState([]);
  const [worker_data, setWorkerData] = useState([]);
  const [worker_selected, setWorkerSelected] = useState({});
  const [page, setPage] = useState(1);
  

  function delete_folder(key){
    let token = sessionStorage.getItem("access_token");
    let head = { headers: { Authorization: "Bearer " + token }};
    axios.post(process.env.REACT_APP_BACKEND_URL + "/delete", {...worker_selected, folder: key},head);
    let folder_temp = worker_folders.filter((folder) => Object.keys(folder)[0] !== key);
    setWorkerFolders(folder_temp);
  }

  function get_folders(v) {
    let data = {
      host: "name",
      limit: "20",
    };
    if (worker_selected.name===undefined){
      setWorkerFolders([]);
      return;
    }
    else{
    console.log("get_folders started",worker_selected);
    // console.log(worker_selected);
    let token = sessionStorage.getItem("access_token");
    let head = { headers: { Authorization: "Bearer " + token }};
    
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/worker_folders",worker_selected,head)
      .then((result) => {
        if (result) {
          console.log("finished updating user", result);
          if (result.status === 200) {
            console.log("success");
            setWorkerFolders(result.data.folders);
          } else {
            setErrMsg(result.data["msg"]);
          }
        }
      });
    }
  }
  
  
  useEffect(() => {
    const dotenv = require('dotenv');
    let conf = dotenv.config();
    console.log(conf)
    
    async function get_worker_data(){
      let data = {tester:'test'};
      let token = sessionStorage.getItem("access_token");
      let head = { headers: { Authorization: "Bearer " + token }};
      axios.post(process.env.REACT_APP_BACKEND_URL + '/workers_online',data,head)
      .then(response => {
        if(response.status===200){
          setWorkerData(response.data.workers);
          console.log(response.data.workers);
        }
        else if(response.status===401){
          console.log(response.data.msg);

          
        }
        if (response.data.workers.length != 0){
          setWorkerSelected(response.data.workers[0]);
          
          
        }
      })
      .catch(error => {
        console.log(error);
        setErrMsg(error.response.data);
      });
    }
  
    get_worker_data();
    // get_folders();

  }
  ,[]);

  
  

  
  const worker_selections = worker_data===undefined?null: worker_data.map(function(worker){
    return (
      <ListGroupItem key={worker.id} value={worker} color={worker.name===worker_selected.name?"primary":"secondary"}>
        <div>
          <Row>
            <Col>
            <ListGroupItemHeading>{worker.name}</ListGroupItemHeading>
            </Col>
            <Col>
          <Button onClick={()=>get_folders(worker_selected)}>select</Button>
          </Col>
          </Row>
          </div>
      </ListGroupItem>    
    );
  });
  
  
  return (
    <div>
      <Row>
        <Col md="12">
        <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">Select Host Computer</CardTitle>
            </CardHeader>

            <ListGroup className="ml-auto">
              {worker_selections}
            </ListGroup>
            
          </Card>
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">Image Folders</CardTitle>
              <h6>from {worker_selected.name}</h6>
              
            </CardHeader>
              
              <Row>
              <p className="text-muted">
                showing folders 1-{page*20} of {worker_folders.length}
              </p>
            <Link  onClick={()=>get_folders(worker_selected)}className="nav-link btn-rotate">
            <Button size="sm" className="btn-rotate" onClick={()=>get_folders(worker_selected)}>
                <i className="nc-icon nc-refresh-69" />
                  
                </Button>
              </Link>
              </Row>
            <ListGroup className="ml-auto">
              {worker_folders.slice((page-1)*20,((page-1)*20)+20).map(function(folder){
                let key = Object.keys(folder)[0];
                let val = folder[key];
    return (
      <ListGroupItem variant="light" className="" style={{maxHeight:'50px'}}>
                <Row>
                  <Col md={"8"}>
                    {/* <Row> */}
                  <p className="text-secondary">
                    {key}{" "}
                    <Badge pill>{val.length}</Badge>
                  </p>
                    {/* </Row> */}
                  </Col>

                <Col md="4">
                  <Row>
                <Button
                  size="sm"
                  className="btn-rotate"
                  style={{ borderRadius: "10px",width:20,height:"20px"}}
                  variant="danger"

                  onClick={() => props.add_folder(key,val.length)}
                >
                  +
                </Button>
                <Button
                  size="sm"
                  style={{borderRadius: "50px",}}
                  color="danger"
                  onClick={() => delete_folder(key)}
                >
                  -
                </Button>
                </Row>
                </Col>
                </Row>
              </ListGroupItem>
    );                          
  })}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default FolderView;
