import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { MongoClient, Db } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
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

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { email, password } = req.body;

  if (req.method !== 'POST') {
    res.statusCode = 404;
    res.json({
      status: 'error',
      message: 'Método GET não permitido /api/users/login'
    });
    return;
  }

  if (!req.body) {
    res.statusCode = 400;
    res.json({
      status: 'error',
      message: 'Necessário um corpo para essa requisição'
    });
    return;
  }

  if (!email) {
    res.statusCode = 400;
    res.json({ status: 'error', message: 'Email não informado' });
    return;
  }

  if (!password) {
    res.statusCode = 400;
    res.json({ status: 'error', message: 'Password não informado' });
    return;
  }

  const db = await connectToDatabase(process.env.MONGODB_URI);

  const collection = db.collection('users');

  const checkExist = await collection.findOne({ email });

  if (!checkExist) {
    res.statusCode = 401;
    res.json({ status: 'error', message: 'Usuário não encontrado.' });
    return;
  }

  const checkPassword = await bcrypt.compare(password, checkExist.password);

  if (!checkPassword) {
    res.statusCode = 401;
    res.json({ status: 'error', message: 'Email ou senha inválidos.' });
    return;
  }

  const token = jwt.sign(
    { _id: checkExist._id, email },
    process.env.API_APP_SECRET,
    {
      expiresIn: '7d'
    }
  );

  res.statusCode = 200;
  res.json({
    status: 'success',
    data: { name: checkExist.name, email, token }
  });
};
