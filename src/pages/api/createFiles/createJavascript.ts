import fs from 'fs';
import { NextApiResponse, NextApiRequest } from 'next';
import { resolve } from 'path';

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  if (req.method !== 'POST') {
    res.statusCode = 404;
    res.json({
      status: 'error',
      message: 'Cannot GET /api/createFiles/createJavascript'
    });
    return;
  }

  const { code } = req.body;

  const dataCode = `export default () => {${JSON.parse(code)}}`;

  const destination = resolve(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'tmp',
    'javascriptTempCode'
  );
  const fileName = 'c2cd4f3a-229f-11eb-adc1-0242ac120002';

  fs.writeFile(`./${destination}/${fileName}.js`, dataCode, err => {
    if (err) console.info(err);
  });

  res.send(`${destination}/${fileName}.txt`);
};
