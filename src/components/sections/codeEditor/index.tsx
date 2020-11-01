import dynamic from 'next/dynamic';
import React from 'react';
import { MonacoEditorProps } from 'react-monaco-editor';

const MonacoEditor = dynamic(import('react-monaco-editor'), { ssr: false });

interface CodeEditorPropos extends MonacoEditorProps {
  height?: string;
  width?: string;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  language: string;
}

const CodeEditor: React.FC<CodeEditorPropos> = props => {
  const {
    height = '400px',
    width = '600px',
    content,
    setContent,
    language = 'html'
  } = props;
  return (
    <MonacoEditor
      width={width}
      height={height}
      language={language}
      theme="vs-dark"
      value={content}
      onChange={setContent}
      options={{
        minimap: {
          enabled: false
        }
      }}
    />
  );
};

export default CodeEditor;
