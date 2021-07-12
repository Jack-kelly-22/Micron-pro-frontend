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
} from "reactstrap";
import axios from "axios";

function JobOptions(props) {
  //Job info
  const [Notes, setNotes] = useState("");
  const [scale, setScale] = useState("");
  //image options
  const [configs, setConfigs] = useState([]);
  const [thresh_value, setThreshValue] = useState(false);
  const [num_circles, setNumCircles] = useState("");
  const [alt_thres, setAltThresh] = useState(false);
  const [crop_size, setCropSize] = useState("");
  const [config_name, setConfigName] = useState("");
  //pores
  const [min_pore, setMinPore] = useState("");
  const [max_pore, setMaxPore] = useState("");
  const [max_diameter, setMaxDiameter] = useState("");
  const [ignore_size, setIgnoreSize] = useState("");
  const [err_msg, setErrMsg] = useState("");

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
    // let token = sessionStorage.getItem("access_token");
    // let head = { headers: { Authorization: "Bearer " + token } };
    axios
      .post("http://127.0.0.1:5000" + "/new_config", { config: config_preset })
      .then((result) => {
        if (result) {
          console.log("finished updating user", result);
          if (result.status === 200) {
            setErrMsg("Job has started... refresh page to start another");
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
    axios.post("http://127.0.0.1:5000" + "/remove_config", {
      config_name: config_name,
    });
    configs.pop(key);
    setConfigs(configs);
  }

  useEffect(() => {
    async function get_configs() {
      let data = { tester: "test" };
      axios
        .post("http://127.0.0.1:5000" + "/get_configs", data)
        .then((response) => {
          setConfigs(response.data.configs);
          console.log(response.data.configs);
        })
        .catch((error) => {
          console.log(error);
          setErrMsg(error.response);
        });
    }

    get_configs();
  }, []);

  return (
    <div className="content">
      <Row>
        <Col className="ml-auto mr-auto" md="6">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">
                {props.type === "settings"
                  ? "Create config preset"
                  : "Job settings"}
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Form>
                <Row>
                  <h6> Pores</h6>
                </Row>
                <Row>
                  <Col className="pr-1" md="4">
                    <FormGroup>
                      <label>Max Diameter(Microns)</label>
                      <Input
                        defaultValue={max_diameter}
                        type="text"
                        onChange={(v) => setMaxDiameter(v.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="4">
                    <FormGroup>
                      <label># of circles</label>
                      <Input
                        defaultValue={num_circles}
                        type="text"
                        onChange={(v) => setNumCircles(v.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="4">
                    <FormGroup>
                      <label>size to ignore (microns)</label>
                      <Input
                        defaultValue="10"
                        type="text"
                        onChange={(v) => setIgnoreSize(v.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col className="pl-1" md="4">
                    <FormGroup>
                      <label>Min Porosity</label>
                      <Input
                        defaultValue={min_pore}
                        placeholder="Last Name"
                        type="text"
                        onChange={(v) => setMinPore(v.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="4">
                    <FormGroup>
                      <label>Max Porosity</label>
                      <Input
                        defaultValue={max_pore}
                        type="text"
                        onChange={(v) => setMaxPore(v.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pr-1" md="4">
                    <FormGroup>
                      <label>Max Diameter(Microns)</label>
                      <Input
                        defaultValue={max_diameter}
                        type="text"
                        onChange={(v) => setMaxDiameter(v.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <h6> Image options</h6>
                </Row>
                <Row>
                  <Col className="pl-1" md="4">
                    <FormGroup>
                      <label>crop_size</label>
                      <Input
                        defaultValue={crop_size}
                        type="text"
                        onChange={(v) => setCropSize(v.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col className="pl-1" md="4">
                    <FormGroup>
                      <label>Threshold Value</label>
                      <Input
                        defaultValue={thresh_value}
                        type="text"
                        onChange={(v) => setThreshValue(v.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col md="12">
                    <FormGroup>
                      <label>Additional Notes</label>
                      <Input
                        type="textarea"
                        defaultValue={Notes}
                        onChange={(v) => setNotes(v.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <div className="update ml-auto mr-auto">
                    <FormGroup>
                      <label>Configuration Name</label>
                      <Input
                        type="text"
                        defaultValue={config_name}
                        onChange={(v) => setConfigName(v.target.value)}
                      />
                    </FormGroup>
                  </div>
                  <div className="update ml-auto mr-auto">
                    <Button
                      className="btn-round"
                      color="primary"
                      onClick={() => post_config()}
                    >
                      Save config
                    </Button>
                    <h6>{err_msg}</h6>
                  </div>
                </Row>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col className="ml-auto mr-auto" md="6">
          <Card className="card-user">
            <CardHeader>
              <CardTitle tag="h5">Saved configs</CardTitle>
            </CardHeader>
            <ListGroup className="ml-auto">
              {configs.map(function (config, i) {
                return (
                  <ListGroupItem
                    variant="light"
                    key={i}
                    className="ml-auto mr-auto"
                    style={{ maxHeight: "50px" }}
                  >
                    <Row>
                      <Col md={"5"}>
                        <Row>
                          <p className="text-secondary">
                            {config.config_name}{" "}
                          </p>
                        </Row>
                      </Col>

                      <Col md={"3"} className="ml-auto">
                        <Button
                          size="sm"
                          style={{ float: "right", borderRadius: "40px" }}
                          variant="danger"
                          onClick={() => load_config(i)}
                        >
                          load
                        </Button>
                      </Col>
                      <Col md={"3"} className="ml-auto">
                        <Button
                          size="sm"
                          style={{ float: "right", borderRadius: "40px" }}
                          variant="danger"
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
          </Card>
        </Col>
      </Row>
    </div>
  );
}
export default JobOptions;
