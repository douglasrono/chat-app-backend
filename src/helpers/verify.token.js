import jwt from 'jsonwebtoken';
import Model from "../database/models/queries";

class verifyTokens {
    static model() {
        return new Model("users"); 
      }
  static verifyAllTokens = async (token) => {
    
    if (token !== '') {
      const decodedToken = jwt.verify(token, process.env.JWTKEY);
      const email = decodedToken.payload.email;
      const user = await this.model().select("*", "email=$1", [email]);
    return user[0]
  	}
  	return null;
  };
}
export default verifyTokens;
