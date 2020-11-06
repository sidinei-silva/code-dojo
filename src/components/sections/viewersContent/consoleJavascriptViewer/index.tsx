import { Box, BoxProps } from '@chakra-ui/core';
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
      if (!str.includes('[Fast Refresh]')) {
        const image = document.createElement('img');
        image.src = '/svg/arrow-point-to-right.svg';
        image.style.width = '10px';
        image.style.marginRight = '1rem';
        const node = document.createElement('div');
        node.style.borderBottom = '1px solid #ccc';
        node.style.paddingBottom = '0.5rem';
        node.style.paddingTop = '0.5rem';
        node.style.display = 'flex';
        node.appendChild(image);
        node.appendChild(document.createTextNode(str));
        iframeElement.appendChild(node);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const firstElement: any = iframeElement.firstElementChild;
        firstElement.style.borderTop = '1px solid #ccc';
      }
    },
    error(str) {
      const image = document.createElement('img');
      image.src = '/svg/arrow-point-to-right.svg';
      image.style.width = '10px';
      image.style.marginRight = '1rem';
      const node = document.createElement('div');
      node.style.color = 'red';
      node.style.borderBottom = '1px solid #ccc';
      node.style.paddingBottom = '0.5rem';
      node.style.paddingTop = '0.5rem';
      node.style.display = 'flex';
      node.appendChild(image);
      node.appendChild(document.createTextNode(str));
      iframeElement.appendChild(node);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const firstElement: any = iframeElement.firstElementChild;
      firstElement.style.borderTop = '1px solid #ccc';
    }
  };
};

const ConsoleJavascriptViewer: React.FC<BoxProps> = props => {
  return (
    <Box
      {...props}
      id="console"
      padding="1.75rem"
      style={{ fontFamily: 'consolas', fontSize: '14px' }}
      overflowY="auto"
    />
  );
};

export default ConsoleJavascriptViewer;
