import { transform } from '@babel/core';

export default function preprocess(str) {
  const { code } = transform(str);

  return code;
}
