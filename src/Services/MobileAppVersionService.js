import requester from "../Utils/Requester";

class MobileAppVersionService {
  getMobileAppVersion() {
    return requester.get("/service/appVersion/get");
  }

  updateMobileAppVersion(data) {
    return requester.post("/service/appVersion/update", data);
  }
}

const mobileAppVersionService = new MobileAppVersionService();

export default mobileAppVersionService;
