import requester from "../Utils/Requester";

export default class BannerService {
  getListBanner() {
    return requester.get("/service/link/find");
  }
}
