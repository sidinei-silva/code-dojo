import { MongoClient, Db, ObjectId } from 'mongodb';
import { NextApiResponse } from 'next';
import url from 'url';

import authenticated, { requestCustom } from '../../../../middlewares/auth';

let cachedDb: Db = null;

async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const dbName = url.parse(uri).pathname.substr(1);

  const db = client.db(dbName);

  cachedDb = db;

  return db;
}

export default authenticated(
  async (req: requestCustom, res: NextApiResponse) => {
    const { userId, userEmail } = req;
    const dbUri = process.env.MONGODB_URI;

    if (req.method !== 'GET') {
      res.statusCode = 404;
      res.json({ status: 'error', message: 'Cannot POST /api/users/me' });
      return;
    }

    const db = await connectToDatabase(dbUri);

    const collection = db.collection('users');

    const checkEmailExist = await collection.findOne({
      _id: new ObjectId(userId),
      email: userEmail
    });

    if (!checkEmailExist) {
      res.statusCode = 401;
      res.json({ status: 'error', message: 'Usuário não encontrado.' });
      return;
    }

    const { name, email } = checkEmailExist;
    res.statusCode = 200;
    res.json({
      status: 'success',
      data: {
        name,
        email
      }
    });
  }
);
