import { MongoClient, Db, ObjectId } from 'mongodb';
import { NextApiResponse } from 'next';
import url from 'url';

import authenticated, { requestCustom } from '../../../middlewares/auth';

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

    const db = await connectToDatabase(dbUri);

    const userCollection = db.collection('users');
    const userModulesColection = db.collection('user_modules');

    const user = await userCollection.findOne({
      _id: new ObjectId(userId),
      email: userEmail
    });

    if (!user) {
      res.statusCode = 401;
      return res.json({ status: 'error', message: 'Usuário não encontrado.' });
    }

    if (req.method === 'GET') {
      const modules = await userModulesColection
        .find({
          user_id: new ObjectId(userId)
        })
        .sort({ updated_at: -1 })
        .limit(10)
        .toArray();

      res.statusCode = 200;
      return res.json({ status: 'success', data: modules });
    }

    return res.json({
      status: 'error',
      message: 'Method not supported'
    });
  }
);
