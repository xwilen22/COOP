import { Editor } from "@monaco-editor/react";

interface TextInputProps {
  value?: string;
  onChange: (value?: string) => void;
}

function TextInput({ value, onChange }: TextInputProps) {
  return (
    <div className="h-body">
      <Editor
        defaultLanguage="markdown"
        value={value}
        onChange={onChange}
        options={{
          codeLens: false,
          minimap: {
            enabled: false,
          },
        }}
      />
    </div>
  );
}

export default TextInput;
