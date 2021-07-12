import { React, useState,useEffect } from "react";

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
import Tables from "views/Tables";

function FolderView() {
  const [worker_folders, setWorkerFolders] = useState([]);
  const [err_msg, setErrMsg] = useState([]);
  const [worker_data, setWorkerData] = useState([]);
  const [worker_selected, setWorkerSelected] = useState("");
  
  useEffect(() => {
    async function get_worker_data(){
      let data = {'tester':'test'};
      axios.post('http://127.0.0.1:5000' + '/workers_online',data)
      .then(response => {
        setWorkerData(response.data.workers);
        console.log(response.data.workers);
      })
      .catch(error => {
        console.log(error);
        setErrMsg(error.response);
      });
    }
  
    get_worker_data();
  }
  ,[]);

  

  function get_folders() {
    let data = {
      host: "http://127.0.0.1:5000",
      limit: "20",
    };
    let token = sessionStorage.getItem("token");
    let head = { headers: { Authorization: "Bearer " + token } };
    axios
      .post(process.env.BACKEND_URL + "/worker_folders", data, head)
      .then((result) => {
        if (result) {
          console.log("finished updating user", result);
          if (result.status === 200) {
            setErrMsg("Job has started... refresh page to start another");
            setWorkerFolders(result.data.folders);
          } else {
            setErrMsg(result.data["msg"]);
          }
        }
      });
  }
  
  const worker_selections = worker_data===undefined?null: worker_data.map(function(worker){
    return (
      <option key={worker.id} value={worker.id}>{worker.name}</option>    
    );                          
  });

  const worker_folder_options = worker_selected===undefined?null: worker_folders.map(function(folder){
    return (
      <option key={folder.name} value={folder.name}>{folder.name}</option>    
    );                          
  });
  
  function update_folders(value){
    console.log(value);
  }
   
  
  return (
    <div className="content">
      <Row>
        <Col className="ml-auto mr-auto" md="6">
        <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">Select Host Computer</CardTitle>
            </CardHeader>

            <form>
            <select onSelect={(v)=>update_folders(v.target.value)}>
              {worker_selections}
            </select>
              <input type="submit" value="Submit" />
            </form>
          </Card>
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">Image Folders</CardTitle>
            </CardHeader>
            
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default FolderView;
