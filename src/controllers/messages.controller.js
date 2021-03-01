import Model from "../database/models/queries";
import verifyTokens from "../helpers/verify.token";
class MessageController {
  static model() {
    return new Model("messages");
  }

  static async getMessages(req, res) {
    try {
      const { token } = req.headers;
      if (token === undefined || token === null || token === "") {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error: `Please provide token first`,
            status: 400,
          })
        );
      } else {
        const user = await verifyTokens.verifyAllTokens(token);
        const id = user.id;
        const messages = await this.model().selectMessages(id);
        const messageDatas = [];
        messages.map((data) => {
          const { receivername } = data;
         
          const found = messageDatas.filter((data) =>
            data.filter((datas) => datas.receivername === receivername)
          );
          if (found.length === 0) {
            const filtedMessages = messages.filter(
              (data) => data.receivername === receivername
            );
            messageDatas.push(filtedMessages);
          }
        });


        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            message: "Messages was retrieved in succesfully",
            messageDatas:[messages],
          })
        );
      }
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: error }));
    }
  }
}

export default MessageController;
