import Model from "../database/models/queries";

class UserHelper {
  static model() {
    return new Model("messages");
  }
  static insertData = async (messageDatas) => {
    const { senderId, receiverName, message } = messageDatas;
    const cols = "senderId,receiverName,message";
    const sels = `'${senderId}', '${receiverName}', '${message}'`;
    let row = await this.model().insert(cols, sels);
  };
}

export default UserHelper;
