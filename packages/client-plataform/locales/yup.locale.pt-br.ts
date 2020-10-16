/* eslint-disable no-template-curly-in-string */
export default {
  mixed: {
    default: '${path} é inválido',
    required: '${path} é um campo obrigatório',
    oneOf: '${path} deve ser um dos seguintes valores: ${values}',
    notOneOf: '${path} não pode ser um dos seguintes valores: ${values}'
  },
  string: {
    length: '${path} deve ter exatamente ${length} caracteres',
    min: '${path} deve ter pelo menos ${min} caracteres',
    max: '${path} deve ter no máximo ${max} caracteres',
    email: '${path} tem o formato de e-mail inválido',
    url: '${path} deve ter um formato de URL válida',
    trim: '${path} não deve conter espaços no início ou no fim.',
    lowercase: '${path} deve estar em maiúsculo',
    uppercase: '${path} deve estar em minúsculo'
  },
  number: {
    min: '${path} deve ser no mínimo ${min}',
    max: '${path} deve ser no máximo ${max}',
    lessThan: '${path} deve ser menor que ${less}',
    moreThan: '${path} deve ser maior que ${more}',
    notEqual: '${path} não pode ser igual à ${notEqual}',
    positive: '${path} deve ser um número posítivo',
    negative: '${path} deve ser um número negativo',
    integer: '${path} deve ser um número inteiro'
  },
  date: {
    min: '${path} deve ser maior que a data ${min}',
    max: '${path} deve ser menor que a data ${max}'
  },
  array: {
    min: '${path} deve ter no mínimo ${min} itens',
    max: '${path} deve ter no máximo ${max} itens'
  }
};
