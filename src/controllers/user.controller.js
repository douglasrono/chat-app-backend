import EncryptPassword from "../helpers/Encryptor";
import comparePassword from "../helpers/Decryptor";
import GenerateToken from "../helpers/token";
import Model from "../database/models/queries";
class UserController {
  static model() {
    return new Model("users");
  }

  static async createUser(req, res) {
    try {
      const { userName, email, password } = req.body;
      const hashedPassword = EncryptPassword(password);
      const user = await this.model().select("*", "email=$1", [email]);
      
      if (user[0]) {
        res.writeHead(409, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error: `User with this email already exist`,
            status: 409,
          })
        );
      } else {
        const cols = "userName, email,password";
        const sels = `'${userName}', '${email}', '${hashedPassword}'`;

        let row = await this.model().insert(cols, sels);
        const user = await this.model().select("*", "email=$1", [email]);
        const token = GenerateToken({
          userName,
          email,
          id:user[0].id
        });
        const data = {
          userName:user[0].userName,
          email:user[0].email,
          token,
        };

        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({ message: "User was created succesfully", data })
        );
      }
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: error }));
    }
  }

  static async userLogin(req, res) {
    try {
      const { email, password } = req.body;
      const user = await this.model().select("*", "email=$1", [email]);
      if (user[0]) {
        if (!comparePassword(password, user[0].password)) {
          res.writeHead(401, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({
              error: `Email or password does not match`,
              status: 401,
            })
          );
        } else {
          const token = GenerateToken({
            userName: user[0].username,
            email: user[0].email,
            id:user[0].id
          });
          const data = {
            userName: user[0].userName,
            email: user[0].email,
            token,
          };

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ message: "User was logged in succesfully", data })
          );
        }
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            error: `User with this account does not exist`,
            status: 404,
          })
        );
      } 
    } catch (error) {
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: error }));
    }
  }
}

export default UserController;
