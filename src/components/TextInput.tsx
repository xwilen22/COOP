import { Editor } from "@monaco-editor/react";

interface TextInputProps {}

function TextInput(props: TextInputProps) {
  return (
    <div className="h-body">
      <Editor defaultLanguage="javascript" defaultValue="//Test" />
    </div>
  );
}

export default TextInput;
