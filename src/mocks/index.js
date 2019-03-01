import faker from 'faker';

import Book from '../models/Issue';
import User from '../models/User';

const BOOKS_TOTAL = 3;
const USERS_TOTAL = 3;

export default async () => {
  try {
    await Book.remove();
    await User.remove();

    await Array.from({ length: USERS_TOTAL }).forEach(async (_, i) => {
      const user = await User.create({
        userName: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        avatar: `https://randomuser.me/api/portraits/women/${i}.jpg`,
        password: 'password123',
      });

      await Array.from({ length: BOOKS_TOTAL }).forEach(
        async () =>
          await Book.create({
            title: faker.commerce.productName(),
            author: faker.name.firstName(),
            edition: `${faker.random.number()}`[0],
            user: user._id,
          }),
      );
    });
  } catch (error) {
    throw error;
  }
};
