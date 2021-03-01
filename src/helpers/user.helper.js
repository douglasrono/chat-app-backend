import Model from "../database/models/queries";

class UserHelper {
  static model() {
    return new Model("messages");
  }
  static insertData = async (messageDatas) => {
    const { senderId, receiverName, message,receiverId } = messageDatas;
    const cols = "senderId,receiverName,message,receiverId";
    const sels = `'${senderId}', '${receiverName}', '${message}', ${receiverId}`;
    let row = await this.model().insert(cols, sels);
  };
}

export default UserHelper;
