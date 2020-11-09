/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-dynamic-require */

import { getFileName } from '../src/pages/api/createFiles/createJavascript';

const fileName = `../tmp/javascriptTempCode/${getFileName()}.js`;

const { default: code } = require(fileName);

jest.spyOn(console, 'log');

test('if i call soma function with 4 and 5 it should return 9', async () => {
  code();
  expect(console.log.mock.calls.length).toBe(1);
});
