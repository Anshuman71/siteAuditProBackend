import jwt from 'jsonwebtoken';
import { UserInputError, ForbiddenError } from 'apollo-server';
import constants from '../config/constants';
import User from '../models/User';

export async function requireAuth(user) {
  if (!user || !user._id) {
    throw new ForbiddenError('Unauthorized!');
  }

  const me = await User.findById(user._id);

  if (!me) {
    throw new ForbiddenError('Unauthorized!');
  }

  return me;
}

export function decodeToken(token) {
  const arr = token.split(' ');

  try {
    if (arr[0] === 'meow') {
      return jwt.verify(arr[1], constants.JWT_SECRET);
    }
  } catch (err) {
    throw new UserInputError('Token not valid!');
  }
}
