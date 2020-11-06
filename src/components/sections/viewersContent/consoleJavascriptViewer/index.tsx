import React from 'react';

const getElementIFrame = (): HTMLElement | null => {
  if (typeof document !== 'undefined') {
    return document.getElementById('console');
  }
  return null;
};

export const clearConsole = () => {
  const iframeElement: HTMLElement = getElementIFrame();

  while (iframeElement.firstChild) {
    iframeElement.removeChild(iframeElement.firstChild);
  }
  iframeElement.innerHTML = '';
};

export const addConsole = () => {
  const iframeElement: HTMLElement = getElementIFrame();
  window.console = {
    ...window.console,
    log(str) {
      const node = document.createElement('div');
      node.appendChild(document.createTextNode(str));
      document.getElementById('console').appendChild(node);
    },
    error(str) {
      const node = document.createElement('div');
      node.appendChild(document.createTextNode(str));
      iframeElement.appendChild(node);
    }
  };
};

const ConsoleJavascriptViewer: React.FC = () => {
  return <div id="console" />;
};

export default ConsoleJavascriptViewer;
