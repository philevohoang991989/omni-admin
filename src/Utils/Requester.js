import stringUtils from "./StringUtils";
import storage from "./Storage";

const axios = require("axios");
const doGet = axios["get"];
const doPost = axios["post"];
const doPut = axios["put"];
const doDelete = axios["delete"];
const baseUrl = "";

const redirectToHome = error => {
  if (error.response && error.response.data) {
    if (error.response.data.errorCode === "ACCESS_TOKEN_INVALID") {
      storage.setAccessToken(undefined);
      //redirect to home for login
      window.location.href = "/";
    }
  }
};

class Requester {
  constructor() {
    const accessToken = storage.getAccessToken();
    if (accessToken) {
      axios["defaults"].headers.common = {
        Authorization: `Bearer ${accessToken}`
      };
    }
  }

  getUrl(path) {
    if (stringUtils.isUrl(path)) {
      return path;
    }
    return baseUrl + path;
  }

  search(path, params) {
    const url = this.getUrl(path);
    return new Promise((resolve, reject) => {
      doGet(url, {
        params: params
      })
        .then(function(response) {
          resolve(response.data || {});
        })
        .catch(function(error) {
          console.error(error);
          reject(error);
        })
        .then(function() {
          // always executed
          console.log(">>> GET " + url);
        });
    });
  }

  get(path, params) {
    const url = this.getUrl(path);
    return new Promise((resolve, reject) => {
      doGet(url, {
        params: params
      })
        .then(function(resp) {
          if (resp && resp["status"] === 200) {
            resolve(resp["data"]);
          } else {
            reject(resp);
          }
        })
        .catch(function(error) {
          redirectToHome(error);
          console.error("error", error);
          reject(error);
        })
        .then(function() {
          // always executed
          console.log(">>> GET " + url);
        });
    });
  }

  post(path, params) {
    const url = this.getUrl(path);
    return new Promise((resolve, reject) => {
      doPost(url, params)
        .then(function(response) {
          console.log(response);
          resolve(response);
        })
        .catch(function(error) {
          console.error(error);
          redirectToHome(error);
          reject(error);
        })
        .then(function() {
          // always executed
          console.log(">>> POST " + url);
        });
    });
  }

  put(path, params) {
    const url = this.getUrl(path);
    return new Promise((resolve, reject) => {
      doPut(url, params)
        .then(function(response) {
          console.log(response);
          resolve(response);
        })
        .catch(function(error) {
          console.error(error);
          redirectToHome(error);
          reject(error);
        })
        .then(function() {
          // always executed
          console.log(">>> PUT " + url);
        });
    });
  }

  delete(path, params) {
    const url = this.getUrl(path);
    return new Promise((resolve, reject) => {
      doDelete(url, params)
        .then(function(response) {
          console.log(response);
          resolve(response);
        })
        .catch(function(error) {
          console.error(error);
          redirectToHome(error);
          reject(error);
        })
        .then(function() {
          // always executed
          console.log(">>> DELETE " + url);
        });
    });
  }
}

const requester = new Requester();

export default requester;
