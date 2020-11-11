/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-dynamic-require */

import { resolve } from 'path';

import { getFileName } from '../../../../../src/pages/api/createFiles/createJavascript';

const destination = resolve(
  __dirname,
  '..',
  '..',
  '..',
  '..',
  '..',
  'tmp',
  'javascriptTempCode'
);

const fileName = `${destination}/${getFileName()}.js`;

const { default: code } = require(fileName);

jest.spyOn(console, 'log');

describe('1-linguagem-de-programacao-atividade-1', () => {
  test('Crie um console.log com Hello World, semelhante ao que ja tem escrito.', async () => {
    code();
    expect(console.log.mock.calls.length).toBe(1);
  });
});
