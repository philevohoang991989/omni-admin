import storage from "../Utils/Storage";
const axios = require("axios");

class AuthServiceImpl {
  getAccessToken() {
    return storage.getAccessToken();
  }

  isLoggedIn() {
    return !!this.getAccessToken();
  }

  login(data) {
    return axios["post"]("/service/auth/login", data).then(resp => {
      storage.setAccessToken(resp.data.data.accessToken);
    });
  }
}

const authService = new AuthServiceImpl();

export default authService;
