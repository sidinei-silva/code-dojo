// eslint-disable-next-line import/no-extraneous-dependencies
import { Linter } from 'eslint';

const linter = new Linter();

linter.defineRule('var-length', {
  meta: {
    type: 'task',
    docs: {
      description: 'Variáveis tem que conter mais de 1 caractere',
      category: 'Check Task'
    }
  },
  create(context) {
    return {
      VariableDeclarator: node => {
        if (node.id.name.length < 2) {
          context.report(node, 'Variáveis tem que conter mais de 1 caractere');
        }
      }
    };
  }
});

export default linter;
