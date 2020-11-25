// eslint-disable-next-line import/no-extraneous-dependencies
import { Linter } from 'eslint';

import { getVariableByName } from '../../_linters/utils';

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

linter.defineRule('contains-2-console', {
  meta: {
    type: 'task',
    docs: {
      description: 'Escreva um console.log()',
      category: 'Check Task'
    }
  },
  create(context) {
    const isConsole = reference => {
      const id = reference.identifier;

      return id && id.name === 'console';
    };

    const isLog = reference => {
      return reference.identifier.parent.property.name === 'log';
    };

    return {
      'Program:exit': function (node) {
        const scope = context.getScope();
        const consoleVar = getVariableByName(scope, 'console');

        const consoles = consoleVar
          ? consoleVar.references
          : scope.through.filter(isConsole);

        const consolesLog = consoles.filter(isLog);

        if (consolesLog.length < 2) {
          context.report(node, 'Escreva um console.log()');
        }
      }
    };
  }
});

export default linter;
