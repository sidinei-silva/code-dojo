import jwt from 'jsonwebtoken';
import { MongoClient, Db, ObjectId } from 'mongodb';
import { NextApiHandler, NextApiResponse, NextApiRequest } from 'next';
import url from 'url';

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

export interface requestCustom extends NextApiRequest {
  userId?: number;
  userEmail?: string;
}

export default (nextHandler: NextApiHandler) => async (
  req: requestCustom,
  res: NextApiResponse
): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não informado' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded: any = jwt.verify(token, process.env.API_APP_SECRET);

    const dbUri = process.env.MONGODB_URI;
    const db = await connectToDatabase(dbUri);
    const collection = db.collection('users');

    const checkEmailExist = await collection.findOne({
      _id: new ObjectId(decoded._id),
      email: decoded.email
    });

    if (!checkEmailExist) {
      res.statusCode = 401;
      return res.json({ status: 'error', message: 'Usuário não encontrado.' });
    }

    req.userId = decoded._id;
    req.userEmail = decoded.email;
  } catch (err) {
    return res.status(401).json({ status: 'error', message: err.message });
  }

  return nextHandler(req, res);
};
