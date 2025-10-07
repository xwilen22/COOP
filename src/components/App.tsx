import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";

import TextInput from "./TextInput";
import { CommandSelection } from "../types";
import { CommandHeader } from "./CommandHeader";

function App() {
  const [input, setInput] = useState<string>();
  const [output, setOutput] = useState<string>();
  const [inputError, setInputError] = useState<string>();

  async function onCommandSelected({ type, value }: CommandSelection) {
    console.log("Command selected", type, value);

    if (typeof input !== "string" || input.length <= 0) {
      setInputError("No valid input");
      return;
    }
    if (type === "transform_input") {
      setInput(
        await invoke("transform_input", { input, transformType: value })
      );
    } else if (type === "get_output") {
      setOutput(await invoke("get_output", { input, outputType: value }));
    }
  }

  return (
    <main className="w-full h-full">
      <CommandHeader
        onChange={onCommandSelected}
        error={inputError}
        output={output}
      />
      <TextInput value={input} onChange={setInput} />
    </main>
  );
}

export default App;
