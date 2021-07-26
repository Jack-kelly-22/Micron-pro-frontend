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
  ListGroupItemHeading,
  Toast,
  ToastBody,
  ToastHeader,
  ToastHeaderText,
  ToastFooter,
  ToastFooterText,
} from "reactstrap";
import axios from "axios";

const dotenv = require("dotenv");
dotenv.config();

function JobOptions(props) {
  //Job info
  const [job_name, setJobName] = useState("");
  const [Notes, setNotes] = useState("");
  const [scale, setScale] = useState("");
  //image options
  const [configs, setConfigs] = useState([]);
  const [thresh_value, setThreshValue] = useState("");
  const [num_circles, setNumCircles] = useState("");
  const [alt_thres, setAltThresh] = useState(false);
  const [crop_size, setCropSize] = useState("");
  const [config_name, setConfigName] = useState("");
  //pores
  const [min_pore, setMinPore] = useState("");
  const [max_pore, setMaxPore] = useState("");
  const [max_diameter, setMaxDiameter] = useState("");
  const [ignore_size, setIgnoreSize] = useState("");

  const [show, setShow] = useState(false);
  const [err_msg, setErrMsg] = useState("");
  const toggle = () => setShow(false);

  function resetStateVars() {
    setJobName(job_name + "1");
    setErrMsg("");
    props.resetStateVars();
  }

  function load_config(i) {
    let new_config = configs[i];
    setNotes(new_config.notes);
    setScale(new_config.scale);
    setThreshValue(new_config.thresh_value);
    setNumCircles(new_config.num_circles);
    setAltThresh(new_config.alt_thresh);
    setCropSize(new_config.crop_size);
    setConfigName(new_config.config_name);
    setMinPore(new_config.min_pore);
    setMaxPore(new_config.max_pore);
    setMaxDiameter(new_config.max_diameter);
    setIgnoreSize(new_config.ignore_size);
    setCropSize(new_config.crop_size);
    setThreshValue(new_config.thresh_value);
    setScale(new_config.scale);
  }

  function post_config() {
    let config_preset = {
      config_name: config_name,
      Notes: Notes,
      scale: scale,
      thresh_value: thresh_value,
      num_circles: num_circles,
      alt_thresh: alt_thres,
      crop_size: crop_size,
      min_pore: min_pore,
      max_pore: max_pore,
      max_diameter: max_diameter,
      ignore_size: ignore_size,
    };
    console.log("save config button has been clicked");
    let token = sessionStorage.getItem("access_token");
    let head = { headers: { Authorization: "Bearer " + token } };
    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/new_config",
        { config: config_preset },
        head
      )
      .then((result) => {
        if (result) {
          console.log("finished updating user", result);
          if (result.status === 200) {
            setErrMsg("Config has been saved refresh to save another");
          } else {
            setErrMsg(result.data["msg"]);
          }
        }
      })
      .catch(function (error) {
        console.log("error,", error.response.data.msg);
        setErrMsg(error.response.data.msg);
      });
  }

  function remove_config(config_name, key) {
    console.log(config_name, key);

    let head = {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      },
    };
    axios.post(process.env.REACT_APP_BACKEND_URL + "/remove_config", {
      config_name: config_name,
    });
    //remove config with config_name from configs array
    let conf = configs.filter((f) => f.config_name !== config_name);

    setConfigs(conf);
  }
  function post_job() {
    let config_preset = {
      config_name: config_name,
      thresh: Number(thresh_value),
      use_alt: false,
      alt_thresh: Number(alt_thres),
      multi: false,
      scale: Number(scale),
      num_circles: Number(num_circles),
      crop: false,
      boarder: crop_size,
      min_porosity: Number(min_pore),
      max_porosity: Number(max_pore),
      max_allowed: Number(max_diameter),
      min_ignore: Number(ignore_size),
      Notes: Notes,
      fiber_type: "dark",
      debug: false,
    };
    let job = {
      job_name: job_name,
      worker_name: props.worker_name,
      constants: config_preset,
      status: "In Progress",
      folders: props.folders.map((f) => f.name),
    };
    console.log("Start job button has been clicked");
    let token = sessionStorage.getItem("access_token");
    let head = { headers: { Authorization: "Bearer " + token } };
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/new_job", { job: job }, head)
      .then((result) => {
        if (result) {
          console.log("finished updating user", result);
          if (result.status === 200) {
            props.setFolders([]);
            setErrMsg("Job has started... refresh page to start another");
            setShow(true);
            resetStateVars();
          } else {
            setErrMsg(result.data["msg"]);
          }
        }
      })
      .catch(function (error) {
        console.log("error,", error.response.data.msg);
        setErrMsg(error.response.data.msg);
      });
  }

  useEffect(() => {
    async function get_configs() {
      let token = sessionStorage.getItem("access_token");
      let head = { headers: { Authorization: "Bearer " + token } };
      let data = { tester: "test" };
      axios
        .post(process.env.REACT_APP_BACKEND_URL + "/get_configs", data, head)
        .then((response) => {
          if (response.status === 200) {
          setConfigs(response.data.configs);
          // setErrMsg("error loading configs please refresh");
          console.log(response.data.configs);
          }
          else{
            console.log("error loading configs please refresh");
            // setErrMsg(response.data.msg);
          }
        })
        .catch((error) => {
          console.log(error);
          setErrMsg(Object.toString(error) + " please refresh");
        });
    }

    get_configs();
  }, []);

  return (
    <div className="content">
      <Row>
        <Col>
        <Toast color="black" isOpen={show}>
                  <ToastHeader icon="success" toggle={toggle} >Reactstrap</ToastHeader>
                  <ToastBody>
                    This is a toast on a white background — check it out!
                    {err_msg}
                  </ToastBody>
                </Toast>
          <h6>
            {props.type === "settings"
              ? "Create config preset"
              : "Select config"}
          </h6>
          <p className="card-text">Saved configs</p>
          <ListGroup>
            {configs.map(function (config, i) {
              return (
                <ListGroupItem
                  variant="light"
                  key={i}
                  className="ml-auto mr-auto"
                  style={{ maxHeight: "50px" }}
                >
                  <Row md={"12"}>
                    <Col md={{ span: 5, offset: 0 }}>
                      <p className="text-secondary">{config.config_name} </p>
                    </Col>

                    <Col
                      md={{ span: 3, offset: 5 }}
                      className="ml-auto mr-auto"
                    >
                      <Button
                        size="sm"
                        style={{ float: "right", borderRadius: "20px" }}
                        color="primary"
                        onClick={() => load_config(i)}
                      >
                        load
                      </Button>
                    </Col>
                    <Col md={{ span: 3, offset: 9 }} className="ml-auto">
                      <Button
                        size="sm"
                        style={{ float: "right", borderRadius: "20px" }}
                        color="danger"
                        onClick={() => remove_config(config.config_name, i)}
                      >
                        delete
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              );
            })}
          </ListGroup>
          <Card body outline color="info">
            <CardHeader tag="h6"> Pores </CardHeader>
            <Row>
              <Col className="pr-1" md="4">
                <label>Max Diameter(Microns)</label>
                <Input
                  defaultValue={max_diameter}
                  type="text"
                  onChange={(v) => setMaxDiameter(v.target.value)}
                />
              </Col>
              <Col className="pl-1" md="4">
                <label># of circles</label>
                <Input
                  defaultValue={num_circles}
                  type="text"
                  onChange={(v) => setNumCircles(v.target.value)}
                />
              </Col>
              <Col className="pr-1" md="4">
                <label>size to ignore (microns)</label>
                <Input
                  defaultValue="10"
                  type="text"
                  onChange={(v) => setIgnoreSize(v.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col className="pl-1" md="4">
                <label>Min Porosity</label>
                <Input
                  defaultValue={min_pore}
                  type="text"
                  onChange={(v) => setMinPore(v.target.value)}
                />
              </Col>
              <Col className="pl-1" md="6">
                <label>Max Porosity</label>
                <Input
                  defaultValue={max_pore}
                  type="text"
                  onChange={(v) => setMaxPore(v.target.value)}
                />
              </Col>
            </Row>
            <Card
              body
              inverse
              style={{ backgroundColor: "#333", borderColor: "#333" }}
            >
              <CardHeader tag="h6"> Image options</CardHeader>

              <CardBody>
                <Row>
                  <Col className="pl-1" md="4">
                    <label>crop_size</label>
                    <Input
                      defaultValue={crop_size}
                      type="text"
                      onChange={(v) => setCropSize(v.target.value)}
                    />
                  </Col>
                  <Col className="pl-1" md="4">
                    <label>Threshold Value</label>
                    <Input
                      defaultValue={thresh_value}
                      type="text"
                      onChange={(v) => setThreshValue(v.target.value)}
                    />
                  </Col>
                  <Col className="pl-1" md="4">
                    <label>Scale</label>
                    <Input
                      defaultValue={scale}
                      type="text"
                      onChange={(v) => setScale(v.target.value)}
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>

            <Card>
              <CardTitle>Summary</CardTitle>
              <label>Additional Notes</label>
              <Input
                type="textarea"
                defaultValue={Notes}
                onChange={(v) => setNotes(v.target.value)}
              />
            </Card>
            <Row>
              <div className="update ml-auto">
                <strong>
                  {props.buttonText === "Save Config"
                    ? "Configuration Name"
                    : "Job Name"}
                </strong>
                <Input
                  type="text"
                  defaultValue={
                    props.buttonText === "Save Config" ? config_name : job_name
                  }
                  onChange={(v) =>
                    props.buttonText === "Save Config"
                      ? setConfigName(v.target.value)
                      : setJobName(v.target.value)
                  }
                />
              </div>
              <div className="update ml-auto mr-auto">
                <Button
                  className="btn-round"
                  color="primary"
                  onClick={() =>
                    props.buttonText === "Save Config"
                      ? post_config()
                      : post_job()
                  }
                >
                  {props.buttonText}
                </Button>
                {/* <h6>{JSON.stringify(err_msg)}</h6> */}
                
              </div>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default JobOptions;
