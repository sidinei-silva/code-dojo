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

    if (req.method === 'POST') {
      if (!req.body) {
        res.statusCode = 400;
        return res.json({ status: 'error', message: 'Body not present' });
      }

      const { topic_slug: topicSlug, module_slug: moduleSlug } = req.body;

      if (!moduleSlug) {
        res.statusCode = 400;
        return res.json({
          status: 'error',
          message: 'Module Slug (module_slug) not present'
        });
      }

      if (!topicSlug) {
        res.statusCode = 400;
        return res.json({
          status: 'error',
          message: 'Topic Slug (topic_slug) not present'
        });
      }

      const topicInModule = await userModulesColection.findOne({
        user_id: new ObjectId(userId),
        module_slug: moduleSlug,
        topics: { $elemMatch: { topic_slug: topicSlug } }
      });

      if (!topicInModule) {
        await userModulesColection.updateOne(
          {
            user_id: new ObjectId(userId),
            module_slug: moduleSlug
          },
          {
            $currentDate: {
              updated_at: true
            },
            $addToSet: {
              topics: {
                topic_slug: topicSlug
              }
            }
          },
          {
            upsert: true
          }
        );
      }

      res.statusCode = 200;
      return res.json({ status: 'success', data: {} });
    }

    return res.json({
      status: 'error',
      message: 'Method not supported'
    });
  }
);
