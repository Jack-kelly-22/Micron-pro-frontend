/**
 * includes functions to store and retrieve user data from sessionstorage
 *
 * @summary functions to easily interact with sessionstorage
 * @author Thread News
 *
 * Created at     : 2021-05-28 22:23:04
 * Last modified  : 2021-07-15 20:05:13
 */

 export function store_user(user, access_token = false) {
    if (access_token) {
      sessionStorage.setItem("access_token", user["access_token"]);
    }
    sessionStorage.setItem("user_name", user["user_name"]);
    sessionStorage.setItem("user_id", user["user_id"]);
  }
  
  export function is_logged_in() {
    return sessionStorage.getItem("user_name");
  }
  
  export function get_user() {
    let user = {
      user_id: sessionStorage.getItem("user_id"),
      user_name: sessionStorage.getItem("user_name"),
      access_token: sessionStorage.getItem("access_token")      
    };
    return user;
  }

  export function signOut(){
    sessionStorage.clear()
  }

  
  export function get_user_id() {
    return sessionStorage.getItem("user_id");
  }
  