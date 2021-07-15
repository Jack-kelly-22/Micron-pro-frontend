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
} from "reactstrap";
import axios from "axios";




function FolderView(props) {

  const [worker_folders, setWorkerFolders] = useState([]);
  const [err_msg, setErrMsg] = useState([]);
  const [worker_data, setWorkerData] = useState([]);
  const [worker_selected, setWorkerSelected] = useState({});
  const [page, setPage] = useState(1);
  

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
    let token = sessionStorage.getItem("token");
    let head = { headers: { Authorization: "Bearer " + token } };
    
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/worker_folders",worker_selected)
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
      let data = {'tester':'test'};
      axios.post(process.env.REACT_APP_BACKEND_URL + '/workers_online',data)
      .then(response => {
        setWorkerData(response.data.workers);
        console.log(response.data.workers);
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
          
          
          <h5>{worker.name}</h5>
          <Button onClick={()=>get_folders(worker_selected)}>select</Button>
          
          </div></ListGroupItem>    
    );
  });
  
  
  return (
    <div className="content">
      <Row>
        <Col className="ml-auto mr-auto" md="6">
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
      <ListGroupItem variant="light" className="ml-auto mr-auto" style={{maxHeight:'50px'}}>
                <Row>
                  <Col md={"9"}>
                    <Row>
                  <p className="text-secondary">
                    {key}{" "}
                    <Badge pill>{val.length}</Badge>
                  </p>
                    </Row>
                  </Col>

                <Col md={"3"} className="ml-auto">
                <Button
                  size="sm"
                  style={{ float: "right", borderRadius: "40px",}}
                  variant="danger"

                  onClick={() => props.add_folder(key,val.length)}
                >
                  Add
                </Button>
                <Button
                  size="sm"
                  style={{ float: "right", borderRadius: "40px",}}
                  color="danger"
                  onClick={() => props.delete_folder(key,val.length)}
                >
                  Delete
                </Button>
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
