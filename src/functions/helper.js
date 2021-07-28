import react from 'react';
import axios from 'axios';

export function review_images(job_id, images, value){
    let data = {action:"review",job_id:job_id, images: images, value:value}
    console.log("Reveiwing images for job: " + job_id);
    let token = sessionStorage.getItem("access_token");
    let head = { headers: { Authorization: "Bearer " + token } };
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/update_job",data, head)
}


export function flag_job(job_id){
    let data = {action:"flag",job_id:job_id}
    let token = sessionStorage.getItem("access_token");
    let head = { headers: { Authorization: "Bearer " + token } };
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/update_job",data, head)
}


export async function get_users(){
    let token = sessionStorage.getItem("access_token");
    let head = { headers: { Authorization: "Bearer " + token } };
    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/users",{test:"test"}, head)
      .then((result) => {
        if (result) {
          console.log("finished fetching users", result);
          if (result.status === 200) {

            return result.data.users;
            
          } else {
            return null;
          }
        }
      })
      .catch(function (error) {
        // console.log("error,", error.response.data.msg);
        return null;
      });
}