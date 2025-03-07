
import jwt from 'jsonwebtoken';

export const verifyToken = async (token) => {
    try {
      // Verify the token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return decoded;
    } catch (error) {
      return null;
    }
  };