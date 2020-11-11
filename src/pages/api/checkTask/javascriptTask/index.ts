/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line import/no-extraneous-dependencies
import { runCLI } from 'jest';
import { NextApiRequest, NextApiResponse } from 'next';

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

  const { testName } = req.body;

  const { results } = await runCLI(
    // @ts-ignore-line
    { bail: false, testNamePattern: `${testName}` },
    ['_modules']
  );

  if (
    results.success &&
    results.numPassedTestSuites === results.numTotalTestSuites
  ) {
    res.json({
      result: true,
      message: 'Parabéns, Justu conquistado com sucesso'
    });
  } else {
    res.json({
      result: false,
      message: 'Não foi desta vez, mas não desanime a próxima será sucesso'
    });
  }
};
