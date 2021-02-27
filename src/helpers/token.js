import jwt from 'jsonwebtoken';

/**
* This generate a jwt token
* @param {Object} payload which includes `email`, `isVerified`, `id`
* @returns {Object} return jwt token
*/
const GenerateToken = (payload) => {
	const token = jwt.sign({
		payload
	}, process.env.JWTKEY,);

	return token;
};
export default GenerateToken;
