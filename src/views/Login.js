/**
 * handles both signin and login functionality
 * based off if user has valid accesstoken
 *
 * @summary login and signup page
 * @author Thread News
 *
 * Created at     : 2021-05-28 10:23:45
 * Last modified  : 2021-08-06 02:44:42
 */

//react imports
import React, { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
// import { Alert } from "react-bootstrap";
import axios from "axios";
//component imports
import { is_logged_in, store_user } from "../functions/LocalStorageHelper";
//css imports
import "../assets/css/Login.css";

//used to import env variables for frontend and backend urls
require("dotenv").config();
console.log();

export default function Login(props) {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const is_login = props.is_login;

  function signOut() {
    sessionStorage.clear();
  }

  function login() {
    console.log("starting login...");
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/login", {
        user_name: username,
        password: password,
      })
      .then((result) => {
        console.log("status", result.status);
        if (result) {
          if (result.status === 404) {
            setErrMsg(result["error"]);
            console.log("Incorrect login");
          }
          if (result.status === 200) {
            sessionStorage.setItem("access_token", result.data.access_token);
            store_user(result.data.user);
            console.log("REsult", result.data);
            props.setLoggedIn(true);
          }
        }
      })
      .catch(function (error) {
        setErrMsg("Incorrect username or password");
      });
  }

  return (
    <div className="outer">
      <div className="inner">
        <form>
          <h3 className="loginText" color="black">
            Log in
          </h3>
          {is_login ? null : (
            <div className="form-group">
              <label>Username</label>
              <input
                onChange={(v) => setUsername(v.target.value)}
                className="form-control"
                placeholder="Enter username"
              />
            </div>
          )}

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              onChange={(v) => setPassword(v.target.value)}
              className="form-control"
              placeholder="Enter password"
            />
          </div>
          {errMsg === "" ? null : errMsg}
          <LinkContainer to="/admin/dashboard">
            <button
              type="submit"
              className="btn btn-dark btn-lg btn-block"
              href="/admin/dashboard"
              onClick={()=>login()}
            >
              Log in
            </button>
          </LinkContainer>
        </form>
      </div>
    </div>
  );
}
