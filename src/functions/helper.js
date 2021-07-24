import react from 'react';
import axios from 'axios';

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