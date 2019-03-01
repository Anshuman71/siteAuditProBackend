import mongoose from 'mongoose';
import constants from './constants';

mongoose.Promise = global.Promise;
mongoose.set('debug', true);

try {
  mongoose.connect(
    constants.DB_URL,
    { useMongoClient: true },
  );
} catch (error) {
  mongoose.createConnection(constants.DB_URL, { useMongoClient: true });
}

mongoose.connection
  .once('open', () => console.log(`Mongodb is running for ${constants.DB_URL}`))
  .on('error', error => {
    throw error;
  });
