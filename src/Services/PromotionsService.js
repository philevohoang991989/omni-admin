import requester from "../Utils/Requester";

export default class Promotions {
  getListPromotions() {
    return requester.get("/service/promotion/find");
  }
  updatePromotion(data) {
    return requester.post("/service/promotion/update", data);
  }
  creatPromotion(data){
    return requester.post("/service/adminNoti/pushNotification", data);
  }
  deletePromotion(data){
    return requester.post("/service/adminNoti/deleteNotification", data);
  }
}
