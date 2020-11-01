/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useState } from 'react';
import { createPortal } from 'react-dom';

const HtmlViewer = ({ children, ...props }) => {
  const [contentRef, setContentRef] = useState(null);
  const mountNode = contentRef?.contentWindow?.document?.body;

  return (
    <iframe
      {...props}
      ref={setContentRef}
      frameBorder="0"
      allowFullScreen
      style={{ width: '100%', height: '100%' }}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};

export default HtmlViewer;
