import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';
import config from './../../config';

const client = new MongoClient(config.db.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db('MCT');
  return next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;