"use client";

import React from "react";
import Editor, { OnChange, EditorProps } from "@monaco-editor/react";

type CodeEditorProps = {
  value: string;
  onChange?: (value: string) => void;
  language?: EditorProps["language"];
  height?: string | number;
  readOnly?: boolean;
  className?: string;
};

export function CodeEditor({
  value,
  onChange,
  language = "plaintext",
  height = 300,
  readOnly = false,
  className = "",
}: CodeEditorProps) {
  const handleChange: OnChange = (val) => {
    if (onChange) onChange(val ?? "");
  };

  return (
    <div className={`bg-background text-primary rounded-md shadow-none ${className}`}>
      <Editor
        height={height}
        language={language}
        value={value}
        onChange={handleChange}
        theme="vs-dark"
        options={{
          readOnly,
          minimap: { enabled: false },
          fontSize: 12,
          scrollBeyondLastLine: false,
          wordWrap: "on",
          roundedSelection: true,
          cursorBlinking: "smooth",
          renderLineHighlight: "line",
        }}
      />
    </div>
  );
}

export default CodeEditor;


