import { NextApiRequest, NextApiResponse } from 'next';

import getLinter from '../../../../../_linters';

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== 'POST') {
    res.statusCode = 404;
    res.json({
      status: 'error',
      message: 'Cannot GET /api/checkTask/javascriptTask'
    });
    return;
  }

  const { code } = req.body;

  const ruleTask = 'var-length';

  const linter = await getLinter(
    'introducao-a-logica-de-programacao-com-javascript'
  );

  const result = linter.verify(JSON.parse(code), {
    useEslintrc: false,
    env: {
      es6: true,
      node: true,
      es2021: true
    },
    rules: { 'var-length': 'error' }
  });

  if (result.length > 0) {
    res.json({
      result: false,
      message: result[0].message,
      line: result[0].line
    });
  } else {
    res.json({
      result: true,
      message: 'Parabéns, Justu conquistado com sucesso'
    });
  }
};
