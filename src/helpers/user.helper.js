import Model from "../database/models/queries";

class UserHelper {
  static model() {
    return new Model("messages");
  }
  static insertData = async (messageDatas) => {
    const { senderId, receiverName, message,receiverId, senderName } = messageDatas;
    const cols = "senderId,receiverName,message,receiverId,senderName";
    const sels = `'${senderId}', '${receiverName}', '${message}', '${receiverId}', '${senderName}'`;
    let row = await this.model().insert(cols, sels);
  }; 
}

export default UserHelper;
