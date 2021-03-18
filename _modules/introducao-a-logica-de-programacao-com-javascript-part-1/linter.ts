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

linter.defineRule('contains-2-console-with-number', {
  meta: {
    type: 'task',
    docs: {
      description:
        'Escreva um console.log() com seu nome e outro com sua idade',
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

    let containStringInLog = false;
    let containNumberInLog = false;

    return {
      'Program:exit': function (node) {
        const scope = context.getScope();
        const consoleVar = getVariableByName(scope, 'console');

        const consoles = consoleVar
          ? consoleVar.references
          : scope.through.filter(isConsole);

        const consolesLog = consoles.filter(isLog);

        if (consolesLog.length < 2) {
          context.report(
            node,
            'Você só escreveu 1 console.log. Escreva um console.log() com seu nome e outro com sua idade'
          );
        }

        consolesLog.map(consoleLog => {
          console.info(consoleLog.identifier.parent.parent.arguments[0].value);
          if (
            typeof consoleLog.identifier.parent.parent.arguments[0].value ===
            'string'
          ) {
            containStringInLog = true;
          }

          if (
            typeof consoleLog.identifier.parent.parent.arguments[0].value ===
            'number'
          ) {
            containNumberInLog = true;
          }

          return true;
        });

        if (!containStringInLog) {
          context.report(
            node,
            'Você não escreveu console.log() com seu nome dentro de aspas. Escreva um console.log() com seu nome e outro com sua idade'
          );
        }

        if (!containNumberInLog) {
          context.report(
            node,
            'Você não escreveu console.log() com sua idade em numero sem aspas. Escreva um console.log() com seu nome e outro com sua idade'
          );
        }
      }
    };
  }
});

linter.defineRule('contains-3-console-with-number-and-boolean', {
  meta: {
    type: 'task',
    docs: {
      description: 'Escreva 3 console.log() com sua string, number e boolean',
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

    let containStringInLog = false;
    let containNumberInLog = false;
    let containBooleanInLog = false;

    return {
      'Program:exit': function (node) {
        const scope = context.getScope();
        const consoleVar = getVariableByName(scope, 'console');

        const consoles = consoleVar
          ? consoleVar.references
          : scope.through.filter(isConsole);

        const consolesLog = consoles.filter(isLog);

        if (consolesLog.length < 3) {
          context.report(node, 'Você não escreveu os 3 console.log()');
        }

        consolesLog.map(consoleLog => {
          if (
            typeof consoleLog.identifier.parent.parent.arguments[0].value ===
            'string'
          ) {
            containStringInLog = true;
          }

          if (
            typeof consoleLog.identifier.parent.parent.arguments[0].value ===
            'number'
          ) {
            containNumberInLog = true;
          }

          if (
            typeof consoleLog.identifier.parent.parent.arguments[0].value ===
            'boolean'
          ) {
            containBooleanInLog = true;
          }

          return true;
        });

        if (!containStringInLog) {
          context.report(node, 'Você não escreveu console.log() com string');
        }

        if (!containNumberInLog) {
          context.report(node, 'Você não escreveu console.log() com number');
        }

        if (!containBooleanInLog) {
          context.report(node, 'Você não escreveu console.log() com boolean');
        }
      }
    };
  }
});

linter.defineRule('instance-var-and-assign-string', {
  meta: {
    type: 'task',
    docs: {
      description: 'Instancie uma variavel e atribua uma nome',
      category: 'Check Task'
    }
  },
  create(context) {
    let containVarWithNameNome = false;
    return {
      'Program:exit': function (node) {
        const { body } = node;

        const variableVar = body.find(
          contentBody => contentBody.kind === 'var'
        );

        if (!variableVar) {
          return context.report(
            node,
            'Você não instanciou uma variável com escopo var'
          );
        }

        variableVar.declarations.map(declaration => {
          if (declaration.id.name === 'nome') {
            containVarWithNameNome = true;
          }
          return true;
        });

        if (!containVarWithNameNome) {
          context.report(node, 'Você não instanciou uma variável chamada nome');
        }

        const attributionVar = body.find(
          contentBody =>
            contentBody.type === 'ExpressionStatement' &&
            contentBody.expression.operator === '=' &&
            contentBody.expression.left.name === 'nome'
        );

        if (!attributionVar) {
          variableVar.declarations.map(declaration => {
            if (declaration.init) {
              return context.report(
                node,
                'Você precisa instanciar a variável sem valor e atribuir seu nome nela na próxima linha.'
              );
            }
            return true;
          });

          return context.report(
            node,
            'Você não atribuiu seu nome na variável (nome)'
          );
        }

        if (typeof attributionVar.expression.right.value !== 'string') {
          return context.report(
            node,
            'Você não atribuiu uma string na variável (nome)'
          );
        }

        return true;
      }
    };
  }
});

linter.defineRule('instance-const-and-assign-number', {
  meta: {
    type: 'task',
    docs: {
      description: 'Instancie uma variavel e atribua uma nome',
      category: 'Check Task'
    }
  },
  create(context) {
    let containVarWithNameNome = false;
    return {
      'Program:exit': function (node) {
        const { body } = node;

        const variableVar = body.find(
          contentBody => contentBody.kind === 'const'
        );

        if (!variableVar) {
          return context.report(
            node,
            'Você não instanciou uma variável com escopo const'
          );
        }

        variableVar.declarations.map(declaration => {
          if (declaration.id.name === 'idade') {
            containVarWithNameNome = true;
          }
          return true;
        });

        if (!containVarWithNameNome) {
          context.report(
            node,
            'Você não instanciou uma variável chamada idade'
          );
        }

        variableVar.declarations.map(declaration => {
          if (!declaration.init) {
            return context.report(
              node,
              'Você precisa instanciar a variável (idade) já com o numero de sua idade'
            );
          }

          if (typeof declaration.init.value !== 'number') {
            return context.report(
              node,
              'A variável idade precisa ser do tipo número'
            );
          }
          return true;
        });

        return true;
      }
    };
  }
});

export default linter;
